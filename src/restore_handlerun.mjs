import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const correctHandleRun = `  const handleRun = async () => {
    setEvaluating(true);
    setVisualState("running");
    setResult(null);
    try {
      const strategy = EvaluationFactory.getStrategyForTask(task.id);
      const engine = new EvaluationEngine(strategy);
      const staticResult = await engine.runEvaluation(code);
      const aiResponse = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, taskDescription: task.description }),
      });
      if (!aiResponse.ok) {
        const errData = await aiResponse.json();
        throw new Error(errData.error || "Failed to reach the evaluation engine.");
      }
      const data = await aiResponse.json();
      const finalResult = {
        ...data,
        success: data.success && staticResult.success,
        review: staticResult.success ? data.review : \`\${staticResult.message}\\n\\n\${data.review}\`,
      };
      let xpScore = data.score;
      if (isCompleted) {
        xpScore = 0;
      } else if (!finalResult.success) {
        xpScore = 0;
      }
      const finalResultWithScore = { ...finalResult, score: xpScore };
      setTimeout(() => {
        setResult(finalResultWithScore);
        setVisualState(finalResultWithScore.success ? "success" : "error");
        setEvaluating(false);
      }, 2000);
    } catch (e: any) {
      console.error("Evaluation Error:", e);
      setResult({
        success: false,
        review: \`Review Engine Error: \${e.message || "Failed to contact the evaluation server."}\`,
        score: 0,
      });
      setVisualState("error");
      setEvaluating(false);
    }
  };`;

content = content.replace(/const handleRun = async \(\) => \{[\s\S]*?\n\s+};/, correctHandleRun);

fs.writeFileSync('src/App.tsx', content);
console.log('Restored handleRun');
