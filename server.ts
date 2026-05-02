import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  app.use(cors());
  app.use(bodyParser.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.post("/api/evaluate", async (req, res) => {
    // ... (existing code for evaluation)
    const { code, initialCode, taskTitle, taskDescription, coreObjectives } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key not configured." });
    }

    try {
      const prompt = `You are an elite and strict Senior Software Architect. Your job is to evaluate a student's code submission for the technical assignment: "${taskTitle}".

      ASSIGNMENT CONTEXT:
      Description: ${taskDescription}
      Core Objectives: ${coreObjectives}
      
      INITIAL BOILERPLATE CODE (What they started with):
      \`\`\`javascript
      ${initialCode}
      \`\`\`

      STUDENT'S SUBMISSION (What to evaluate):
      \`\`\`javascript
      ${code}
      \`\`\`

      GRADING CRITERIA:
      1. CRITICAL: If the submission is identical to the boilerplate code, identical to an empty function, or lacks any actual implementation of the objectives, YOU MUST SET success: false and score: 0.
      2. CHEATING/LAZINESS: Do not pass the student if they only added comments or whitespace.
      3. Functional Correctness: Does it solve all objectives?
      4. Code Quality: Is it clean, readable, and idiomatic?
      5. Professionalism: Is there proper error handling if applicable?

      REVIEW STRUCTURE:
      - Start with a brief, professional observation.
      - If they failed because of no-op/boilerplate submission, tell them firmly that they must implement the logic.
      - Provide 1-2 specific architectural or security improvements.
      - Final score must be 0-100. Passing is 70+.

      Return ONLY a JSON object:
      {
        "success": boolean,
        "review": "markdown string",
        "score": number,
        "optimizationTips": ["tip 1", "tip 2"]
      }`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: "You are a senior mentor who values actual implementation over empty submissions." }, { role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("Empty response from OpenAI");

      const data = JSON.parse(content);
      res.json(data);
    } catch (error: any) {
      console.error("AI Evaluation Error:", error);
      res.status(500).json({ error: "System Review Error: " + (error.message || "Unknown error") });
    }
  });

  app.post("/api/interview", async (req, res) => {
    const { interview, history, currentCode } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key not configured." });
    }

    try {
      const prompt = `
        You are ${interview.interviewer.name}, ${interview.interviewer.role} at ${interview.company}.
        Personality: ${interview.interviewer.personality}
        Role being interviewed for: ${interview.role} (${interview.difficulty})

        Current Session History:
        ${history.map((m: any) => `${m.sender.toUpperCase()}: ${m.text}`).join("\n")}
        
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

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: "You are a professional technical interviewer." }, { role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("Empty response from OpenAI");

      const result = JSON.parse(content);
      res.json(result);
    } catch (error: any) {
      console.error("OpenAI Interview Error:", error);
      res.status(500).json({ 
        responseText: "I'm having some trouble connecting to the evaluation server. Let's pause here.",
        scoreDelta: 0,
        phase: 'complete',
        feedback: "System Offline"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
