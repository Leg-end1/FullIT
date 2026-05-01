import React from 'react';
import { 
  ArrowRight, Cpu, User as UserIcon, Server, Database, 
  AlertCircle, CheckCircle2 
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './utils';

export interface VisualizationData {
  type: 'architecture' | 'logic' | 'memory';
  state: 'idle' | 'running' | 'success' | 'error';
}

export const VisualizerAdapter = {
  render(data: VisualizationData): React.ReactNode {
    switch (data.type) {
      case 'logic':
        return <LogicVisualizer state={data.state} />;
      case 'memory':
        return <MemoryVisualizer state={data.state} />;
      case 'architecture':
      default:
        return <ArchitectureVisualizer state={data.state} />;
    }
  }
};

function LogicVisualizer({ state }: { state: VisualizationData['state'] }) {
  return (
    <div className="w-full max-w-3xl flex items-center justify-between relative px-12">
      <div className="absolute inset-x-24 top-1/2 -translate-y-1/2 h-1 bg-neutral-200/50 rounded-full overflow-hidden">
        {state === 'running' && (
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute top-0 w-24 h-full bg-neutral-400 shadow-sm"
          />
        )}
      </div>
      <VisualNode icon={<ArrowRight className="w-8 h-8" />} label="Input" active={state !== 'idle'} color="sky" />
      <VisualNode icon={<Cpu className="w-8 h-8" />} label="Process" active={state !== 'idle'} status={state === 'error' ? 'error' : state === 'success' ? 'success' : 'idle'} color="purple" />
      <VisualNode icon={<ArrowRight className="w-8 h-8" />} label="Output" active={state === 'success'} color="emerald" />
    </div>
  );
}

function MemoryVisualizer({ state }: { state: VisualizationData['state'] }) {
  return (
    <div className="w-full max-w-3xl flex flex-col gap-8 items-center relative">
      <div className="grid grid-cols-2 gap-12 w-full">
        <div className="space-y-4">
          <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">Stack</h5>
          <div className="flex flex-col-reverse gap-2">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                animate={state === 'running' ? { opacity: [0.3, 1, 0.3], scale: [1, 1.02, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                className={cn(
                  "h-10 rounded-xl border-2 flex items-center justify-center text-[10px] font-mono transition-all",
                  state === 'success' ? "bg-green-100 border-green-500/30 text-green-600" :
                  state === 'error' ? "bg-red-100 border-red-500/30 text-red-600" :
                  "bg-neutral-50 border-neutral-200 text-neutral-400"
                )}
              >
                Frame {i}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">Heap</h5>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map(i => (
              <motion.div 
                key={i}
                animate={state === 'running' ? { rotate: [0, 90, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                className={cn(
                  "aspect-square rounded-xl border-2 flex items-center justify-center text-[10px] font-mono transition-all",
                  state === 'success' ? "bg-purple-100 border-purple-500/30 text-purple-600" :
                  state === 'error' ? "bg-red-100 border-red-500/30 text-red-600" :
                  "bg-neutral-50 border-neutral-200 text-neutral-400"
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

function ArchitectureVisualizer({ state }: { state: VisualizationData['state'] }) {
  return (
    <div className="w-full max-w-3xl flex items-center justify-between relative px-12">
      <div className="absolute inset-x-24 top-1/2 -translate-y-1/2 h-1 bg-neutral-200/50 rounded-full overflow-hidden">
        {state === 'running' && (
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 w-24 h-full bg-neutral-400 shadow-sm"
          />
        )}
      </div>
      <VisualNode icon={<UserIcon className="w-8 h-8" />} label="Client" active={state !== 'idle'} color="sky" />
      <VisualNode icon={<Server className="w-8 h-8" />} label="API" active={state !== 'idle'} status={state === 'error' ? 'error' : state === 'success' ? 'success' : 'idle'} color="purple" />
      <VisualNode icon={<Database className="w-8 h-8" />} label="DB" active={state === 'success'} color="emerald" />
    </div>
  );
}

function VisualNode({
  icon,
  label,
  active,
  status,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  status?: string;
  color: string;
}) {
  const colors: Record<string, string> = {
    sky: "text-neutral-700 bg-neutral-50 border-black shadow-sm",
    purple:
      "text-purple-600 bg-purple-50 border-purple-200 shadow-sm",
    emerald:
      "text-emerald-600 bg-emerald-50 border-emerald-200 shadow-sm",
  };
  return (
    <div className="relative flex flex-col items-center gap-5 z-10 group">
      <motion.div
        animate={
          active
            ? {
                scale: [1, 1.02, 1],
                boxShadow:
                  status === "error"
                    ? "0 0 50px rgba(239, 68, 68, 0.2)"
                    : status === "success"
                      ? "0 0 50px rgba(16, 185, 129, 0.2)"
                      : undefined,
              }
            : {}
        }
        transition={{ repeat: Infinity, duration: 3 }}
        className={cn(
          "w-28 h-28 rounded-[2.5rem] border flex items-center justify-center transition-all duration-700 relative",
          active
            ? colors[color]
            : "bg-neutral-50/50 border-neutral-100 text-neutral-300",
        )}
      >
        <div
          className={cn(
            "transition-all duration-700",
            active ? "scale-110" : "scale-100",
          )}
        >
          {icon}
        </div>
        {status === "error" && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-1 -right-1 bg-red-500 p-2.5 rounded-2xl border-4 border-white shadow-xl"
          >
            <AlertCircle className="w-4 h-4 text-white" />
          </motion.div>
        )}
        {status === "success" && (
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-1 -right-1 bg-emerald-500 p-2.5 rounded-2xl border-4 border-white shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </motion.div>
      <span
        className={cn(
          "text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-700 font-display",
          active ? "text-black" : "text-neutral-300",
        )}
      >
        {label}
      </span>
    </div>
  );
}
