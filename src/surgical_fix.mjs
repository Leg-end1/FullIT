import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const taskViewReplacement = `function TaskView({
  task,
  isCompleted,
  onBack,
  onComplete,
}: {
  task: Task;
  isCompleted: boolean;
  onBack: () => void;
  onComplete: (s: number) => void;
}) {
  const [code, setCode] = useState(task.initialCode);
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    review: string;
    score: number;
    optimizationTips?: string[];
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"inbox" | "basics" | "instructions">("inbox");
  const [activeStep, setActiveStep] = useState(0);
  const [openTips, setOpenTips] = useState<number[]>([]);
  const [visualState, setVisualState] = useState<"idle" | "running" | "success" | "error">("idle");

  const handleRun = async () => {
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
        review: staticResult.success
          ? data.review
          : \`\${staticResult.message}\\n\\n\${data.review}\`,
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="h-[calc(100vh-120px)] flex flex-col gap-6"
    >
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-8">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black hover:border-neutral-300 transition-all active:scale-90"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h3 className="text-3xl font-bold text-black font-display tracking-tight">
                {task.title}
              </h3>
              <span
                className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] border",
                  task.priority === "urgent"
                    ? "bg-red-100 text-red-600 border-red-200 "
                    : task.priority === "high"
                      ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                      : "bg-neutral-100 text-black border-neutral-200 "
                )}
              >
                {task.priority || "medium"}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono tracking-wider">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-100 " />
                {task.category}
              </span>
              <span className="text-slate-800">|</span>
              <span className="capitalize">{task.difficulty}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {result && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 px-6 py-3 glass-panel bg-white/50 rounded-2xl"
            >
              <Award className="w-5 h-5 text-yellow-600 " />
              <span className="text-lg font-bold text-black font-display">
                +{result.score} XP
              </span>
            </motion.div>
          )}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 min-h-0">
        <div className="col-span-1 md:col-span-4 flex flex-col glass-panel bg-white/50 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden min-h-[400px]">
          <div className="flex border-b border-neutral-200 shrink-0">
            {[
              { id: "inbox", icon: Mail, label: "Brief" },
              { id: "basics", icon: BookOpen, label: "Basics" },
              { id: "instructions", icon: ClipboardList, label: "Lab & Tips" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 py-4 flex items-center justify-center gap-2 lg:gap-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-neutral-700 "
                    : "text-neutral-400 hover:text-neutral-700 "
                )}
              >
                <tab.icon className="w-4 h-4 hidden sm:block" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="task-tab"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-neutral-100 shadow-sm"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === "inbox" && (
                <motion.div
                  key="inbox"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-8"
                >
                  <div className="bg-slate-950/50 border border-neutral-200 rounded-[2rem] p-6 lg:p-8 space-y-6">
                    <div className="flex items-center justify-between pb-6 border-b border-neutral-200 ">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-neutral-200 border border-neutral-300 overflow-hidden shrink-0">
                          <img
                            src={task.sender?.avatar}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="text-sm lg:text-base font-bold text-black font-display">
                            {task.sender?.name}
                          </p>
                          <p className="text-[10px] lg:text-xs text-neutral-400 ">
                            {task.sender?.role}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase hidden lg:block">
                        09:41 AM
                      </span>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-lg lg:text-xl font-bold text-black leading-tight font-display tracking-tight">
                        {task.subject || "Task Assignment"}
                      </h4>
                      <div className="text-neutral-500 text-sm leading-relaxed space-y-4 font-light">
                        <p>Hi there,</p>
                        <p>{task.description}</p>
                        <p>
                          Please review the technical requirements in the Lab
                          tab and the fundamental concepts in the Basics tab
                          before starting.
                        </p>
                        <p>
                          Best regards,
                          <br />
                          {task.sender?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === "basics" && (
                <motion.div
                  key="basics"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4">
                      Core Concepts
                    </h4>
                    <p className="text-neutral-500 text-sm mb-4 leading-relaxed font-light">
                      Review the concepts before starting to prevent basic
                      errors.
                    </p>
                    {task.basics?.map((item, idx) => (
                      <div
                        key={idx}
                        className="glass-panel bg-white/50 rounded-2xl p-5 sm:p-6 space-y-3 hover:border-black transition-all"
                      >
                        <h5 className="text-sm font-bold text-black flex items-center gap-3 font-display">
                          <div className="w-2 h-2 rounded-full bg-neutral-100 shadow-sm shrink-0" />
                          {item.title}
                        </h5>
                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {activeTab === "instructions" && (
                <motion.div
                  key="instructions"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                        Technical Steps
                      </h4>
                      <span className="text-[10px] font-mono text-neutral-400 ">
                        {activeStep + 1} / {task.instructions.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {task.instructions.map((step, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={cn(
                            "w-full text-left p-4 lg:p-5 rounded-2xl border transition-all text-sm group relative overflow-hidden",
                            activeStep === idx
                              ? "bg-neutral-50 border-black text-black "
                              : "bg-slate-950/50 border-neutral-200 text-neutral-500 hover:border-neutral-300 "
                          )}
                        >
                          <div className="flex items-center gap-3 lg:gap-4 relative z-10 w-full pr-4">
                            <div
                              className={cn(
                                "w-6 h-6 lg:w-8 lg:h-8 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all shrink-0",
                                activeStep === idx
                                  ? "bg-neutral-100 text-black shadow-sm"
                                  : "bg-neutral-100 text-neutral-400 group-hover:text-neutral-700 "
                              )}
                            >
                              {idx + 1}
                            </div>
                            <span className="font-bold font-display leading-snug truncate block">
                              {step.title}
                            </span>
                          </div>
                          {activeStep === idx && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-4 text-neutral-500 leading-relaxed sm:pl-12 text-xs font-light"
                            >
                              {step.content}
                            </motion.p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-neutral-200 ">
                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
                      Progressive Tips
                    </h4>
                    <div className="space-y-3">
                      {(task.tips || []).map((tip, idx) => {
                        const isOpen = openTips.includes(idx);
                        return (
                          <div
                            key={idx}
                            className={cn(
                              "border rounded-xl overflow-hidden glass-panel bg-white/50 transition-all duration-300",
                              isOpen ? "border-black bg-neutral-50 " : "border-neutral-200 "
                            )}
                          >
                            <button
                              onClick={() =>
                                setOpenTips((prev) =>
                                  prev.includes(idx)
                                    ? prev.filter((i) => i !== idx)
                                    : [...prev, idx]
                                )
                              }
                              className="w-full p-4 flex justify-between items-center hover:bg-neutral-100/50 transition-colors"
                            >
                              <span
                                className={cn(
                                  "text-xs font-medium text-left pr-4",
                                  isOpen ? "text-black font-bold" : "text-neutral-700 "
                                )}
                              >
                                {tip.title}
                              </span>
                              <ChevronRight
                                className={cn(
                                  "w-4 h-4 shrink-0 transition-transform duration-300",
                                  isOpen ? "rotate-90 text-black " : "text-neutral-400 "
                                )}
                              />
                            </button>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="px-4 pb-4 pt-1 border-t border-neutral-200 border-black mt-2 text-neutral-500 text-[11px] leading-relaxed"
                              >
                                {tip.content}
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="col-span-8 flex flex-col gap-8 min-h-0">
          <div className="h-1/3 glass-panel bg-white/50 rounded-[2.5rem] p-10 relative overflow-hidden shrink-0">
            <div className="blueprint-grid absolute inset-0 opacity-20" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xs font-bold text-black font-display flex items-center gap-3 tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center border border-neutral-200 ">
                    <Zap className="w-4 h-4 text-black " />
                  </div>
                  System Visualization
                </h4>
                <div
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-500",
                    visualState === "idle"
                      ? "bg-neutral-100 border-neutral-200 text-neutral-400 "
                      : visualState === "running"
                        ? "bg-neutral-100 border-black text-black animate-pulse"
                        : visualState === "success"
                          ? "bg-green-100 border-emerald-500/30 text-green-600 "
                          : "bg-red-100 border-red-500/30 text-red-600 "
                  )}
                >
                  {visualState}
                </div>
              </div>
              <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none origin-center">
                  <div className="transform scale-[0.6] sm:scale-75 md:scale-90 lg:scale-[1.1] transition-transform duration-500 will-change-transform">
                    {VisualizerAdapter.render({
                      type: task.visualType || "architecture",
                      state: visualState,
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#05070a] border border-neutral-200 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl min-h-0 relative">
            <div className="bg-slate-900/30 px-8 py-4 border-b border-neutral-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
                </div>
                <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-950 rounded-xl border border-neutral-200 ">
                  <Code2 className="w-4 h-4 text-black " />
                  <span className="text-xs font-mono text-neutral-500 ">
                    main.js
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCode(task.initialCode)}
                className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-black transition-all"
                title="Reset Code"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 relative min-h-0 overflow-y-auto custom-scrollbar">
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) =>
                  Prism.highlight(code, Prism.languages.javascript, "javascript")
                }
                padding={40}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 14,
                  minHeight: "100%",
                  backgroundColor: "transparent",
                }}
                className="w-full text-sky-300 outline-none leading-relaxed selection:bg-neutral-100 "
              />
            </div>
            <div className="p-8 bg-slate-900/30 border-t border-neutral-200 shrink-0">
              <button
                onClick={handleRun}
                disabled={evaluating}
                className="w-full bg-neutral-100 hover:bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-50 text-black font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-4 shadow-sm active:scale-[0.98]"
              >
                {evaluating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Play className="w-6 h-6 fill-current" />
                )}
                <span className="text-lg tracking-tight">
                  Submit Code for Review
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-neutral-100 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="bg-[#0d1017] border border-neutral-200 w-full max-w-5xl max-h-[95vh] rounded-[2rem] sm:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 lg:p-8 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/20 shrink-0">
                <div className="flex items-center gap-5">
                  <div
                    className={cn(
                      "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0",
                      result.success
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    )}
                  >
                    {result.success ? (
                      <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                    ) : (
                      <XCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-black mb-1">
                      {result.success ? "Evaluation Passed" : "System Review Failed"}
                    </h2>
                    <p className="text-neutral-500 text-xs sm:text-sm">
                      Automated Code Analysis by Senior Architect
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-4xl lg:text-5xl font-bold font-display text-black ">
                    {result.score}
                    <span className="text-lg lg:text-xl text-neutral-400 ">
                      /100
                    </span>
                  </div>
                  {isCompleted && result.success && (
                    <div className="text-[10px] sm:text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded border border-yellow-200 uppercase tracking-wider font-bold shrink-0 mt-1">
                      Already Completed (+0 XP)
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar bg-[#05070a]">
                <div className="max-w-4xl mx-auto space-y-12">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-6 border-b border-neutral-200 pb-3 flex items-center gap-3 font-display">
                      <UserIcon className="w-5 h-5 text-black " /> Senior Architect's
                      Feedback
                    </h3>
                    <div className="whitespace-pre-wrap text-neutral-700 text-sm sm:text-[15px] leading-relaxed bg-slate-900/30 p-6 lg:p-8 rounded-3xl border border-neutral-200 shadow-inner">
                      {result.review}
                    </div>
                  </div>
                  {result.optimizationTips &&
                    result.optimizationTips.length > 0 && (
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-6 border-b border-neutral-200 pb-3 flex items-center gap-3 font-display">
                          <Zap className="w-5 h-5 text-yellow-600 " /> Optimization
                          Suggestions
                        </h3>
                        <ul className="space-y-4">
                          {result.optimizationTips.map(
                            (tip: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex gap-4 items-start text-neutral-700 bg-yellow-500/5 p-4 lg:p-6 rounded-2xl border border-yellow-500/10 hover:border-yellow-500/30 transition-colors"
                              >
                                <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-600 border border-yellow-500/30 flex items-center justify-center text-xs shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="leading-relaxed text-sm sm:text-[15px]">
                                  {tip}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
              <div className="p-6 lg:p-8 border-t border-neutral-200 bg-slate-900/20 flex flex-col sm:flex-row justify-end gap-3 lg:gap-4 shrink-0">
                <button
                  onClick={() => setResult(null)}
                  className="px-6 py-4 rounded-xl font-medium text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors w-full sm:w-auto text-center"
                >
                  {result.success ? "Review Code Anyway" : "Try Again"}
                </button>
                {result.success && !isCompleted && (
                  <button
                    onClick={() => onComplete(result.score)}
                    className="px-8 lg:px-10 py-4 rounded-xl font-bold text-black bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
                  >
                    Complete Task <ArrowRight className="w-5 h-5" />
                  </button>
                )}
                {result.success && isCompleted && (
                  <button
                    onClick={() => onComplete(result.score)}
                    className="px-6 py-4 rounded-xl font-medium text-neutral-500 hover:text-black transition-colors w-full sm:w-auto text-center underline"
                  >
                    Close Window
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SystemVisualizer({
  state,
  type,
}: {
  state: "idle" | "running" | "success" | "error";
  type: "architecture" | "logic" | "memory";
}) {
  if (type === "logic") {
    return (
      <div className="w-full max-w-3xl flex items-center justify-between relative px-12">
        <div className="absolute inset-x-24 top-1/2 -translate-y-1/2 h-1 bg-neutral-200/50 rounded-full overflow-hidden">
          {state === "running" && (
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute top-0 w-24 h-full bg-neutral-100 shadow-sm"
            />
          )}
        </div>
        <VisualNode
          icon={<ArrowRight className="w-8 h-8" />}
          label="Input"
          active={state !== "idle"}
          color="sky"
        />
        <VisualNode
          icon={<Cpu className="w-8 h-8" />}
          label="Process"
          active={state !== "idle"}
          status={
            state === "error" ? "error" : state === "success" ? "success" : "idle"
          }
          color="purple"
        />
        <VisualNode
          icon={<ArrowRight className="w-8 h-8" />}
          label="Output"
          active={state === "success"}
          color="emerald"
        />
      </div>
    );
  }
  if (type === "memory") {
    return (
      <div className="w-full max-w-3xl flex flex-col gap-8 items-center relative">
        <div className="grid grid-cols-2 gap-12 w-full">
          <div className="space-y-4">
            <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
              Stack
            </h5>
            <div className="flex flex-col-reverse gap-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={
                    state === "running"
                      ? { opacity: [0.3, 1, 0.3], scale: [1, 1.02, 1] }
                      : {}
                  }
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className={cn(
                    "h-10 rounded-xl border-2 flex items-center justify-center text-[10px] font-mono transition-all",
                    state === "success"
                      ? "bg-green-100 border-emerald-500/30 text-green-600 "
                      : state === "error"
                        ? "bg-red-100 border-red-500/30 text-red-600 "
                        : "bg-neutral-100 border-neutral-200 text-neutral-400 "
                  )}
                >
                  Frame {i}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">
              Heap
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={
                    state === "running"
                      ? { rotate: [0, 90, 0], scale: [1, 1.1, 1] }
                      : {}
                  }
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                  className={cn(
                    "aspect-square rounded-xl border-2 flex items-center justify-center text-[10px] font-mono transition-all",
                    state === "success"
                      ? "bg-purple-100 border-purple-500/30 text-purple-600 "
                      : state === "error"
                        ? "bg-red-100 border-red-500/30 text-red-600 "
                        : "bg-neutral-100 border-neutral-200 text-neutral-400 "
                  )}
                >
                  Obj {i}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-3xl flex items-center justify-between relative px-12">
      <div className="absolute inset-x-24 top-1/2 -translate-y-1/2 h-1 bg-neutral-200/50 rounded-full overflow-hidden">
        {state === "running" && (
          <>
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-sm"
            />
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
                delay: 0.75,
              }}
              className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-sm"
            />
          </>
        )}
        {state === "success" && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute inset-0 bg-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] origin-left"
          />
        )}
        {state === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-red-500/30"
          />
        )}
      </div>
      <VisualNode
        icon={<UserIcon className="w-8 h-8" />}
        label="Client"
        active={state !== "idle"}
        color="sky"
      />
      <VisualNode
        icon={<Server className="w-8 h-8" />}
        label="API Server"
        active={state !== "idle"}
        status={
          state === "error" ? "error" : state === "success" ? "success" : "idle"
        }
        color="purple"
      />
      <VisualNode
        icon={<Database className="w-8 h-8" />}
        label="Database"
        active={state === "success"}
        color="emerald"
      />
    </div>
  );
}`;

const taskViewRegex = /function TaskView\(\{[\s\S]*?className="absolute -top-1 -right-1 bg-emerald-500 p-2.5 rounded-2xl border-4 border-\[#020408\] shadow-xl"[\s\S]*?<\/motion.div>[\s\S]*?<\/motion.div>[\s\S]*?<\/div>[\s\S]*?\);[\s\S]*?}/;
// Actually I'll just use a simpler marker if possible, or replace from turn 7 cache.
// I'll try to find the start and a safe end.
const startIdx = content.indexOf('function TaskView({');
const endIdx = content.indexOf('function RankingView()');

if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + taskViewReplacement + "\n\n" + content.substring(endIdx);
}

fs.writeFileSync('src/App.tsx', content);
console.log('Surgically replaced TaskView');
