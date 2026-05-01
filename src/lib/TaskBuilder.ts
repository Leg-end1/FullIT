import { Task, TaskStep, TaskTip } from "../types";

export class TaskBuilder {
  private task: Partial<Task> = {
    difficulty: "beginner",
    category: "General",
    instructions: [],
    basics: [],
    tips: [],
    objectives: [],
  };

  constructor(id: string) {
    this.task.id = id;
  }

  setTitle(title: string) {
    this.task.title = title;
    return this;
  }

  setDescription(desc: string) {
    this.task.description = desc;
    return this;
  }

  setTrack(trackId: string) {
    this.task.trackId = trackId;
    return this;
  }

  setCategory(cat: string) {
    this.task.category = cat;
    return this;
  }

  setDifficulty(diff: 'beginner' | 'intermediate' | 'advanced') {
    this.task.difficulty = diff;
    return this;
  }

  setInitialCode(code: string) {
    this.task.initialCode = code;
    return this;
  }

  setSender(name: string, role: string, avatar?: string) {
    this.task.sender = { name, role, avatar };
    return this;
  }

  setSubject(subject: string) {
    this.task.subject = subject;
    return this;
  }

  addInstruction(title: string, content: string) {
    this.task.instructions?.push({ title, content });
    return this;
  }

  addBasic(title: string, content: string) {
    this.task.basics?.push({ title, content });
    return this;
  }

  addTip(title: string, content: string) {
    this.task.tips?.push({ title, content });
    return this;
  }

  addObjective(objective: string) {
    this.task.objectives?.push(objective);
    return this;
  }

  setVisualType(type: 'architecture' | 'logic' | 'memory') {
    this.task.visualType = type;
    return this;
  }

  setPriority(prio: 'low' | 'medium' | 'high' | 'urgent') {
    this.task.priority = prio;
    return this;
  }

  build(): Task {
    if (!this.task.id || !this.task.title || !this.task.trackId || !this.task.initialCode) {
      throw new Error(`Incomplete task definition for ${this.task.id}`);
    }
    return this.task as Task;
  }
}
