import { GoogleGenAI, Type } from "@google/genai";
import { Interview, InterviewProbe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

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
    const prompt = `
      You are ${interview.interviewer.name}, ${interview.interviewer.role} at ${interview.company}.
      Personality: ${interview.interviewer.personality}
      Role being interviewed for: ${interview.role} (${interview.difficulty})

      Current Session History:
      ${history.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join("\n")}
      
      Current Code in Editor:
      ${currentCode}

      GOAL: Conduct a realistic 3-phase technical interview.
      1. THOUGHT: If we just started, ask the first theoretical question.
      2. FOLLOW-UP: If the user just answered, provide brief feedback (as the character) and either ask a follow-up OR move to a coding task.
      3. CODE REVIEW: If the user submitted code, look for bugs, performance issues, or architectural flaws. Ask them to explain a specific part.
      4. WRAP-UP: After ~3-5 exchanges, conclude the interview.

      SCORING: 
      - Give a scoreDelta for the last response (0 to 20).
      - Total possible score is 100.
      - If they pass (70+), congratulate them. If not, be professional but indicate they aren't the right fit yet.

      Response must be valid JSON matching this schema:
      {
        "responseText": "The character's dialogue",
        "scoreDelta": number,
        "phase": "theory" | "practical" | "review" | "complete",
        "feedback": "Internal technical evaluation of their last answer"
      }
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              responseText: { type: Type.STRING },
              scoreDelta: { type: Type.NUMBER },
              phase: { type: Type.STRING, enum: ["theory", "practical", "review", "complete"] },
              feedback: { type: Type.STRING }
            },
            required: ["responseText", "scoreDelta", "phase", "feedback"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      return {
        responseText: result.responseText,
        scoreDelta: result.scoreDelta || 0,
        phase: result.phase as any || 'theory',
        feedback: result.feedback || ""
      };
    } catch (error) {
      console.error("Gemini Interview Error:", error);
      return {
        responseText: "I'm having some trouble connecting to the evaluation server. Let's pause here.",
        scoreDelta: 0,
        phase: 'complete',
        feedback: "System Offline"
      };
    }
  },
  // Keep legacy for compatibility if needed, but we'll use conductInterviewStep primarily
  async gradeInterviewProbe(
    interview: Interview,
    probe: InterviewProbe,
    answer: string
  ): Promise<GradeResult> {
    // ... same as before ...
    return this.gradeInterviewProbe(interview, probe, answer);
  }
};
