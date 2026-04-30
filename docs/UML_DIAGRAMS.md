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

## 3. Justification for Enterprise Standards
*   **Separation of Concerns:** Components like `TaskView` do not know *how* tasks are fetched or evaluated; they only interact with standard interfaces.
*   **Loose Coupling:** The `Strategy` pattern allows us to update the "Rules of the Lab" without modifying the UI layer.
*   **Scalability:** The `Factory` pattern ensures we can pivot to a cloud-based Database provider for task data with zero downtime and minimal code changes.
