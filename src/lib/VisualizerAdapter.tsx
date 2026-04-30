import React from 'react';
import { 
  ArrowRight, Cpu, User as UserIcon, Server, Database, 
  AlertCircle 
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './utils';

/**
 * Enterprise Structural Pattern: Adapter
 * 
 * The VisualizerAdapter allows the application to support diverse 
 * visualization requirements (Memory Stack, Logic Flow, Architecture) 
 * through a unified rendering interface.
 */

export interface VisualizationData {
  type: 'architecture' | 'logic' | 'memory';
  state: 'idle' | 'running' | 'success' | 'error';
}

export const VisualizerAdapter = {
  render(data: VisualizationData): React.ReactNode {
    // This acts as the adapter that maps internal state to component logic
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

// Internal Components (Implementation Details)

function LogicVisualizer({ state }: { state: VisualizationData['state'] }) {
  return (
    <div className="w-full max-w-3xl flex items-center justify-between relative px-12">
      <div className="absolute inset-x-24 top-1/2 -translate-y-1/2 h-1 bg-slate-800/50 rounded-full overflow-hidden">
        {state === 'running' && (
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute top-0 w-24 h-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.8)]"
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
          <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Stack</h5>
          <div className="flex flex-col-reverse gap-2">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                animate={state === 'running' ? { opacity: [0.3, 1, 0.3], scale: [1, 1.02, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                className={cn(
                  "h-10 rounded-xl border-2 flex items-center justify-center text-[10px] font-mono transition-all",
                  state === 'success' ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" :
                  state === 'error' ? "bg-red-500/10 border-red-500/30 text-red-500" :
                  "bg-slate-900 border-slate-800 text-slate-600"
                )}
              >
                Frame {i}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Heap</h5>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map(i => (
              <motion.div 
                key={i}
                animate={state === 'running' ? { rotate: [0, 90, 0], scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                className={cn(
                  "aspect-square rounded-xl border-2 flex items-center justify-center text-[10px] font-mono transition-all",
                  state === 'success' ? "bg-purple-500/10 border-purple-500/30 text-purple-500" :
                  state === 'error' ? "bg-red-500/10 border-red-500/30 text-red-500" :
                  "bg-slate-900 border-slate-800 text-slate-600"
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
      <div className="absolute inset-x-24 top-1/2 -translate-y-1/2 h-1 bg-slate-800/50 rounded-full overflow-hidden">
        {state === 'running' ? (
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-[0_0_15px_rgba(14,165,233,0.8)]"
          />
        ) : state === 'success' ? (
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="absolute inset-0 bg-emerald-500/30 origin-left" />
        ) : state === 'error' ? (
          <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="absolute inset-0 bg-red-500/30" />
        ) : null}
      </div>
      <VisualNode icon={<UserIcon className="w-8 h-8" />} label="Client" active={state !== 'idle'} color="sky" />
      <VisualNode icon={<Server className="w-8 h-8" />} label="API" active={state !== 'idle'} status={state === 'error' ? 'error' : state === 'success' ? 'success' : 'idle'} color="purple" />
      <VisualNode icon={<Database className="w-8 h-8" />} label="DB" active={state === 'success'} color="emerald" />
    </div>
  );
}

function VisualNode({ icon, label, active, status, color }: any) {
  const colors: any = {
    sky: 'text-sky-400 bg-sky-500/5 border-sky-500/30 shadow-[0_0_40px_rgba(14,165,233,0.15)]',
    purple: 'text-purple-400 bg-purple-500/5 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]',
    emerald: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]'
  };

  return (
    <div className="relative flex flex-col items-center gap-5 z-10">
      <motion.div 
        animate={active ? { scale: [1, 1.02, 1] } : {}}
        transition={{ repeat: Infinity, duration: 3 }}
        className={cn(
          "w-28 h-28 rounded-[2.5rem] border flex items-center justify-center transition-all duration-700",
          active ? colors[color] : "bg-slate-900/40 border-slate-800/50 text-slate-700"
        )}
      >
        <div className={cn("transition-all duration-700", active ? "scale-110" : "scale-100")}>
          {icon}
        </div>
        {status === 'error' && (
          <div className="absolute -top-1 -right-1 bg-red-500 p-2.5 rounded-2xl border-4 border-[#020408]">
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
        )}
      </motion.div>
      <span className={cn("text-[10px] font-bold uppercase tracking-widest", active ? "text-slate-300" : "text-slate-600")}>
        {label}
      </span>
    </div>
  );
}
