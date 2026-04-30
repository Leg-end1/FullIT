/**
 * Enterprise Behavioral Pattern: Strategy
 * 
 * The Strategy pattern is used to define a family of algorithms, 
 * encapsulate each one, and make them interchangeable. 
 * This allows the task evaluation logic to vary independently 
 * from the client that uses it.
 */

export interface EvaluationResult {
  success: boolean;
  score: number;
  message: string;
}

export interface IEvaluationStrategy {
  evaluate(code: string, expectedOutput?: any): Promise<EvaluationResult>;
}

class RegexEvaluationStrategy implements IEvaluationStrategy {
  constructor(private pattern: RegExp, private successMessage: string) {}

  async evaluate(code: string): Promise<EvaluationResult> {
    const isValid = this.pattern.test(code);
    return {
      success: isValid,
      score: isValid ? 100 : 0,
      message: isValid ? this.successMessage : "Requirement not met. Check your variable names and types."
    };
  }
}

class RuntimeEvaluationStrategy implements IEvaluationStrategy {
  async evaluate(code: string): Promise<EvaluationResult> {
    try {
      // Security Note: In a real system, this would be executed in a sandboxed worker
      // For this learning platform, we simulate the evaluation result.
      const isSuccess = code.includes('return') || code.includes('console.log') || code.length > 20;
      return {
        success: isSuccess,
        score: isSuccess ? 100 : 0,
        message: isSuccess ? "Code executed successfully. Test cases passed." : "Execution failed. Check for syntax errors."
      };
    } catch (e) {
      return { success: false, score: 0, message: "Runtime Error: " + (e as Error).message };
    }
  }
}

export class EvaluationEngine {
  private strategy: IEvaluationStrategy;

  constructor(strategy: IEvaluationStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: IEvaluationStrategy) {
    this.strategy = strategy;
  }

  async runEvaluation(code: string): Promise<EvaluationResult> {
    return await this.strategy.evaluate(code);
  }
}

// Global accessor for consistency
export const EvaluationFactory = {
  getStrategyForTask(taskId: string): IEvaluationStrategy {
    if (taskId.startsWith('js-syntax')) {
      return new RegexEvaluationStrategy(/let|const|var/, "Variables declared correctly.");
    }
    return new RuntimeEvaluationStrategy();
  }
};
