import { Interview, InterviewProbe } from "../types";

export interface GradeResult {
  score: number;
  feedback: string;
  mentorAdvice: string;
}

export const aiService = {
  async conductInterviewStep(
    interview: Interview,
    history: { sender: 'ai' | 'user'; text: string; code?: string }[],
    currentCode: string
  ): Promise<{ 
    responseText: string; 
    scoreDelta: number; 
    phase: 'theory' | 'practical' | 'review' | 'complete';
    feedback: string;
  }> {
    
    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interview, history, currentCode }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      return await response.json();
    } catch (error) {
      console.error("OpenAI Interview Error:", error);
      return {
        responseText: "I'm having some trouble connecting to the evaluation server. Let's pause here.",
        scoreDelta: 0,
        phase: 'complete',
        feedback: "System Offline"
      };
    }
  },
  
  async gradeInterviewProbe(
    interview: Interview,
    probe: InterviewProbe,
    answer: string
  ): Promise<GradeResult> {
    // Note: If you want to use the backend for grading probes too, 
    // you would need to implement an /api/gradeProbe route in server.ts
    // For now, this is kept as is, but should be refactored similarly.
    return { score: 0, feedback: "Not implemented on backend", mentorAdvice: "" };
  }
};
