# Enterprise Project Architecture: Java UML Diagrams

This document provides the standard UML representations for the final project submission, demonstrating the structural integrity of the "StackMaster" enterprise system using Java Enterprise conventions.

## 1. Class Diagram (Java Enterprise Patterns)

```mermaid
classDiagram
    %% Creational: Factory Method
    class TaskProviderFactory {
        +getProvider(type: String) ITaskProvider$
    }
    class ITaskProvider {
        <<interface>>
        +getTasksByTrack(trackId: String) List
        +getTaskById(taskId: String) Object
    }
    class StaticTaskProvider {
        +getTasksByTrack(trackId: String) List
    }
    class DatabaseTaskProvider {
        +getTasksByTrack(trackId: String) List
    }
    TaskProviderFactory ..> ITaskProvider : creates
    ITaskProvider <|.. StaticTaskProvider
    ITaskProvider <|.. DatabaseTaskProvider

    %% Structural: Adapter
    class VisualizerAdapter {
        +adaptToEngine(request: VisualRequest) Object
    }
    class IEngine {
        <<interface>>
        +process(state: State) Object
    }
    class LogicEngineAdapter {
        +process(state: State) Object
    }
    class MemoryEngineAdapter {
        +process(state: State) Object
    }
    VisualizerAdapter --> IEngine : delegates
    IEngine <|.. LogicEngineAdapter
    IEngine <|.. MemoryEngineAdapter

    %% Behavioral: Strategy
    class EvaluationEngine {
        -strategy IEvaluationStrategy
        +run(code: String) CompletableFuture
    }
    class IEvaluationStrategy {
        <<interface>>
        +evaluate(code: String) CompletableFuture
    }
    class RegexStrategy {
        +evaluate(code: String) CompletableFuture
    }
    class RuntimeStrategy {
        +evaluate(code: String) CompletableFuture
    }
    EvaluationEngine o-- IEvaluationStrategy : uses
    IEvaluationStrategy <|.. RegexStrategy
    IEvaluationStrategy <|.. RuntimeStrategy
```

## 2. Sequence Diagram (Java Task Submission Flow)

```mermaid
sequenceDiagram
    participant Frontend
    participant EvaluationEngine
    participant IEvaluationStrategy
    participant GeminiAI

    Frontend->>EvaluationEngine: run(submittedCode)
    EvaluationEngine->>IEvaluationStrategy: evaluate(submittedCode)
    Note over IEvaluationStrategy: Local validation (Regex/Logic)
    IEvaluationStrategy-->>EvaluationEngine: localResult
    
    Frontend->>GeminiAI: process(codeSnippet, taskContext)
    GeminiAI-->>Frontend: refinedCodeReview (JSON)
    
    Frontend->>Frontend: mergeResults(local, ai)
    Frontend->>Frontend: updateVisualState(success)
```

## 3. Component Diagram
This diagram shows the high-level organization of the FullIT system modules.

```mermaid
componentDiagram
    [User Browser] as UB
    component [React Frontend] {
      [Task Engine] as TE
      [Visualizer Adapter] as VA
      [Auth Manager] as AM
    }
    database [Firestore]
    [Gemini AI API] as AI
    
    UB --> AM : login
    UB --> TE : writes code
    TE --> VA : triggers visuals
    TE --> AI : requests review
    AM --> Firestore : sync profile
    TE --> Firestore : save progress
```

## 4. Entity Relationship Diagram (Firestore Schema)
While Firestore is NoSQL, our data architecture follows this relational model.

```mermaid
erDiagram
    USER ||--o{ PROGRESS : tracks
    TRACK ||--o{ TASK : contains
    TASK ||--o{ PROGRESS : relates_to
    
    USER {
        string uid
        string displayName
        int totalScore
        float efficiency
    }
    
    TASK {
        string id
        string title
        string difficulty
        string visualType
    }
    
    PROGRESS {
        string userId
        string taskId
        boolean completed
        timestamp lastAttempt
    }
```

## 5. Justification for Enterprise Standards
*   **Separation of Concerns:** Components like `TaskView` do not know *how* tasks are fetched or evaluated; they only interact with standard interfaces.
*   **Loose Coupling:** The `Strategy` pattern allows us to update the "Rules of the Lab" without modifying the UI layer.
*   **Scalability:** The `Factory` pattern ensures we can pivot to a cloud-based Database provider for task data with zero downtime and minimal code changes.
