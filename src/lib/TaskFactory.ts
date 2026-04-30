import { Task, Track } from '../types';
import { ALL_TASKS } from '../constants';

/**
 * Enterprise Creational Pattern: Factory Method
 * 
 * decouples the client from the concrete implementation of tasks.
 * This allows us to scale from local static tasks to remote API tasks
 * or database-driven tasks without changing the UI components.
 */

export interface ITaskProvider {
  getTasksByTrack(trackId: string): Task[];
  getTaskById(taskId: string): Task | undefined;
}

class StaticTaskProvider implements ITaskProvider {
  getTasksByTrack(trackId: string): Task[] {
    return ALL_TASKS.filter(t => t.trackId === trackId);
  }

  getTaskById(taskId: string): Task | undefined {
    return ALL_TASKS.find(t => t.id === taskId);
  }
}

// In the future, we can add DatabaseTaskProvider or AITaskProvider
export class TaskProviderFactory {
  private static instance: ITaskProvider;

  public static getProvider(): ITaskProvider {
    if (!this.instance) {
      // Logic to decide which provider to use
      this.instance = new StaticTaskProvider();
    }
    return this.instance;
  }
}
