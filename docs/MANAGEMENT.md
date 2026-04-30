# StackMaster: Java Enterprise Learning System
## Project Management & Architecture Documentation

---

### Phase 1: Software Project Management

#### 1. Project Charter & Scope (MVP)
**Project Name:** StackMaster  
**Objective:** Provide an immersive, industry-simulated environment for software engineers to learn full-stack development through practical, visual-feedback-driven labs.

**MVP Scope:**
- **User Authentication:** Secure Google Login via Firebase.
- **Dashboard:** Centralized hub for tracking progress across multiple tracks.
- **Task Lab:** A real-time code editor with syntax highlighting, visual execution, and AI-driven feedback.
- **System Visualizer:** Dynamic visual representation of system architecture, logic flows, and memory stacks.
- **Profile Management:** Tracking user score, completed tasks, and current efficiency.

**Constraints:**
- Must run in an isolated browser environment.
- Limited execution time for user-submitted code in simulation.
- UI must maintain a "High-End Engineering" aesthetic.

#### 2. Risk Management Plan
| Risk ID | Risk Description | Impact | Probability | Mitigation Strategy |
|---------|------------------|--------|-------------|---------------------|
| R-001   | Technical Debt (Scale) | High | Medium | Use strict TypeScript interfaces and SOLID Design Patterns from Day 1. |
| R-002   | Scope Creep | Medium | High | Defined strict MVP boundaries; use a modular "Track" system for easy expansion. |
| R-003   | Dependency Failure | Medium | Low | Use well-vetted libraries (React, Framer Motion, Firebase) with locked versions. |
| R-004   | UI Performance (HMR) | Medium | Medium | Optimize component rendering using memoization and standard Vite patterns. |
| R-005   | Server Inaccessibility | High | Low | Implement robust error handling for Firebase connection and lazy initialization. |

#### 3. Work Breakdown Structure (WBS)
1. **Infrastructure & Setup**
   - 1.1 Environment Config (Vite, React, Tailwind)
   - 1.2 Firebase Integration (Auth, Firestore)
2. **Core UI Engineering**
   - 2.1 Layout System & Glassmorphism Theme
   - 2.2 Navigation Architecture
3. **Task Engine Development**
   - 3.1 Lab Component (Editor, Syntax Highlighting)
   - 3.2 System Visualizer (SVG/Canvas Logic)
4. **Data & Services Layer**
   - 4.1 Profile Service
   - 4.2 Task Management Engine (Factory Pattern)

---

### Phase 2: Design Patterns & Architecture (Java Enterprise Focus)

#### 1. Creational: Factory Method Pattern
**Implementation:** `java/com/stackmaster/factory/TaskProviderFactory.java`  
**Problem solved:** Decouples the UI from the concrete data source.
**Justification:** By using a `TaskProviderFactory`, we can inject different providers (JDBC, Cloud, or Mock) without changing the business logic. This follows the **Open/Closed Principle**.

#### 2. Structural: Adapter Pattern
**Implementation:** `java/com/stackmaster/adapter/VisualizerAdapter.java`  
**Problem solved:** Normalizes incompatible visualization interfaces into a unified rendering engine.
**Justification:** The `VisualizerAdapter` wraps complex sub-visualization logic into a unified `adaptToEngine()` method, promoting reusability and scalability.

#### 3. Behavioral: Strategy Pattern
**Implementation:** `java/com/stackmaster/strategy/EvaluationEngine.java`  
**Problem solved:** Hard-coded validation logic made it difficult to add new types of verification algorithms.
**Justification:** The `EvaluationEngine` accepts an `IEvaluationStrategy`. This allows us to swap the grading algorithm at runtime (Regex vs. Sandbox), achieving highly decoupled logic.

---

### Phase 4: Post-Mortem Report

**Successes:** 
The transition to a pattern-based architecture mid-development allowed for much faster integration of the "Java Enterprise" track, as the infrastructure was already abstracted following standard enterprise conventions.

**Challenges:** 
Ensuring that the React frontend communicated accurately with an architecture modeled after Java's strict typing required a robust adaptation layer (The Adapter Pattern).

**Lessons Learned:** 
Strict WBS planning and the use of the Strategy pattern prevented "feature creep" by forcing every new evaluation logic to be its own self-contained module.
