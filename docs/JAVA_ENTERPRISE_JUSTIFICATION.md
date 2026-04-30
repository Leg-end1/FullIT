# Java Enterprise Architecture: Design Patterns Justification

This document provides a Java-based architectural justification for the "StackMaster" enterprise platform, as required for senior software engineering evaluation.

## 1. Creational Pattern: Factory Method
**Implementation Reference:** `java/com/stackmaster/factory/TaskProviderFactory.java`

### Enterprise Rationale:
By using the Factory Method, we decouple the application logic from the object creation process. In a professional Java environment (Spring/Jakarta EE), this pattern is critical for dependency injection and ensuring the system is "Open for Extension but Closed for Modification." It allows us to swap a static task provider for a JPA-backed database provider seamlessly.

## 2. Structural Pattern: Adapter
**Implementation Reference:** `java/com/stackmaster/adapter/VisualizerAdapter.java`

### Enterprise Rationale:
The Adapter pattern allows objects with incompatible interfaces to collaborate. We use it to unify various visualization engines (Logic, Memory, Architecture) under a single interface, simplifying the main rendering loop and promoting reusability across different UI frameworks.

## 3. Behavioral Pattern: Strategy
**Implementation Reference:** `java/com/stackmaster/strategy/EvaluationEngine.java`

### Enterprise Rationale:
The Strategy pattern encapsulates different algorithms (Regex analysis vs. Sandbox execution) and makes them interchangeable at runtime. This provides the platform with an "Interchangeable Brain," allowing us to scale the complexity of task verification without refactoring the core execution engine.
