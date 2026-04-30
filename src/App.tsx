import React, { useState, useEffect, useRef } from 'react';
import { auth, signInWithGoogle, logout, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { 
  LogIn, LogOut, BookOpen, Code, Award, 
  User as UserIcon, CheckCircle2, ChevronRight, 
  Layers, Map, Zap, Database, Shield, Server,
  ArrowRight, Info, Play, RefreshCw, XCircle, AlertCircle,
  Mail, ClipboardList, Code2, Layout, Cloud, Cpu, Terminal
} from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { cn } from './lib/utils';
import { UserProfile, Task, Track, TaskStep } from './types';
import { ALL_TASKS, TRACKS } from './constants';
import { userService, taskService } from './services/dataService';
import { TaskProviderFactory } from './lib/TaskFactory';
import { VisualizerAdapter } from './lib/VisualizerAdapter';
import { EvaluationFactory, EvaluationEngine } from './lib/EvaluationStrategy';

// Code Editor Imports
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tracks' | 'profile' | 'exams'>('dashboard');
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    let profileUnsubscribe: (() => void) | null = null;

    const authUnsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setUser(currentUser);
        
        // Cleanup previous profile subscription if user changes
        if (profileUnsubscribe) {
          profileUnsubscribe();
          profileUnsubscribe = null;
        }

        if (currentUser) {
          // Initial profile check
          let existingProfile = await userService.getProfile(currentUser.uid);
          
          if (!existingProfile) {
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || 'Engineer',
              email: currentUser.email || '',
              completedTasks: [],
              totalScore: 0,
              role: 'student',
              currentTrackId: 'backend-fundamentals',
              createdAt: new Date().toISOString()
            };
            await setDoc(doc(db, 'users', currentUser.uid), newProfile);
            setProfile(newProfile);
          } else {
            setProfile(existingProfile);
          }

          // Real-time subscription
          profileUnsubscribe = userService.subscribeToProfile(currentUser.uid, (updatedProfile) => {
            setProfile(updatedProfile);
          });
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Auth/Profile Initialization Error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      authUnsubscribe();
      if (profileUnsubscribe) profileUnsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center blueprint-grid">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full shadow-[0_0_20px_rgba(14,165,233,0.3)]"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex flex-col items-center justify-center p-4 text-white blueprint-grid">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full text-center space-y-12"
        >
          <div className="flex justify-center">
            <div className="p-6 bg-sky-500/10 rounded-3xl border border-sky-500/20 shadow-[0_0_50px_rgba(14,165,233,0.1)]">
              <Terminal className="w-20 h-20 text-sky-500" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight font-display">StackMaster<span className="text-sky-500">.</span></h1>
            <p className="text-slate-400 text-xl leading-relaxed">The interactive laboratory for full-stack engineers. Learn by building, visualizing, and mastering real systems.</p>
          </div>
          <button
            onClick={signInWithGoogle}
            className="group relative flex items-center justify-center gap-3 bg-sky-500 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-sky-400 transition-all shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] mx-auto"
          >
            <LogIn className="w-6 h-6" />
            Initialize Session
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-300 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-800/50 flex flex-col p-6 space-y-10 bg-[#0d1117]/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-sky-500/10 rounded-lg border border-sky-500/20">
            <Terminal className="w-6 h-6 text-sky-500" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white font-display">StackMaster</span>
        </div>

          <nav className="flex-1 space-y-2">
          <NavItem 
            icon={<Map className="w-5 h-5" />} 
            label="Roadmap" 
            active={activeTab === 'dashboard'} 
            onClick={() => { setActiveTab('dashboard'); setSelectedTask(null); setSelectedTrack(null); }} 
          />
          <NavItem 
            icon={<Zap className="w-5 h-5" />} 
            label="Learning Tracks" 
            active={activeTab === 'tracks'} 
            onClick={() => { setActiveTab('tracks'); setSelectedTask(null); setSelectedTrack(null); }} 
          />
          <NavItem 
            icon={<Shield className="w-5 h-5" />} 
            label="Interview Simulator" 
            active={activeTab === 'exams'} 
            onClick={() => { setActiveTab('exams'); setSelectedTask(null); setSelectedTrack(null); }} 
          />
          <NavItem 
            icon={<UserIcon className="w-5 h-5" />} 
            label="Lab Profile" 
            active={activeTab === 'profile'} 
            onClick={() => { setActiveTab('profile'); setSelectedTask(null); setSelectedTrack(null); }} 
          />
        </nav>

        <div className="pt-6 border-t border-slate-800/50">
          {profile?.currentTrackId && (
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50 mb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Active Track</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-500/20">
                  <Server className="w-5 h-5 text-sky-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">
                    {TRACKS.find(t => t.id === profile.currentTrackId)?.title || 'Fundamentals'}
                  </p>
                  <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-sky-500 h-full transition-all duration-500" 
                      style={{ width: `${(profile.completedTasks.length / ALL_TASKS.filter(t => t.trackId === profile.currentTrackId).length) * 100}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white hover:bg-slate-900 rounded-xl transition-all font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto blueprint-grid relative">
        <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-10 bg-[#0a0c10]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white font-display">
              {selectedTask ? selectedTask.title : selectedTrack ? selectedTrack.title : activeTab}
            </h2>
            {selectedTask && (
              <span className="px-2 py-0.5 bg-sky-500/10 text-sky-500 text-[10px] font-bold uppercase tracking-widest rounded border border-sky-500/20">
                Task Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-2xl border border-slate-800/50">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-bold text-white">{profile?.totalScore || 0} <span className="text-slate-500 font-normal">XP</span></span>
            </div>
            <div className="h-10 w-px bg-slate-800/50" />
            <img 
              src={user.photoURL || ''} 
              alt={user.displayName || ''} 
              className="w-10 h-10 rounded-2xl border-2 border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {selectedTask ? (
              <TaskView 
                task={selectedTask} 
                onBack={() => setSelectedTask(null)} 
                onComplete={async (score) => {
                  if (user) {
                    await userService.updateProgress(user.uid, selectedTask.id, score);
                  }
                  setSelectedTask(null);
                }}
              />
            ) : activeTab === 'dashboard' ? (
              <DashboardView 
                profile={profile} 
                onSelectTrack={(track) => {
                  setSelectedTrack(track);
                  setActiveTab('tracks');
                }} 
                onSelectTask={setSelectedTask} 
              />
            ) : activeTab === 'tracks' ? (
              <TracksListView 
                onSelectTrack={async (track) => {
                  if (user) {
                    await userService.setTrack(user.uid, track.id);
                  }
                  setSelectedTrack(track);
                }} 
                selectedTrack={selectedTrack}
                onSelectTask={setSelectedTask}
              />
            ) : activeTab === 'exams' ? (
              <ExamsView />
            ) : (
              <ProfileView profile={profile} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium relative group",
        active 
          ? "text-sky-400" 
          : "text-slate-500 hover:text-slate-200"
      )}
    >
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute inset-0 bg-sky-500/5 border border-sky-500/10 rounded-xl"
        />
      )}
      <div className={cn(
        "relative z-10 transition-colors",
        active ? "text-sky-400" : "group-hover:text-slate-200"
      )}>
        {icon}
      </div>
      <span className="relative z-10">{label}</span>
    </button>
  );
}

function DashboardView({ profile, onSelectTrack, onSelectTask }: { profile: UserProfile | null, onSelectTrack: (t: Track) => void, onSelectTask: (t: Task) => void }) {
  const currentTrack = TRACKS.find(t => t.id === profile?.currentTrackId) || TRACKS[0];
  const trackTasks = ALL_TASKS.filter(t => t.trackId === currentTrack.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 pb-20"
    >
      <div className="relative overflow-hidden glass-panel p-12 rounded-[3rem] shadow-2xl group">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-[0.2em]">System Status: Operational</span>
          </div>
          <h3 className="text-5xl font-bold text-white mb-6 font-display tracking-tight leading-tight">
            Welcome back, <br />
            <span className="text-sky-500 glow-text">Engineer {profile?.displayName?.split(' ')[0]}</span>
          </h3>
          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed font-light">
            You've completed <span className="text-white font-medium">{profile?.completedTasks.length || 0}</span> modules in <span className="text-white font-medium">{currentTrack.title}</span>. Your current efficiency rating is <span className="text-sky-400 font-bold">84.2%</span>.
          </p>
          <div className="mt-10 flex gap-4">
            <button 
              onClick={() => onSelectTrack(currentTrack)}
              className="bg-sky-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-sky-400 transition-all flex items-center gap-3 shadow-lg shadow-sky-500/20 active:scale-95"
            >
              Resume Mission
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
          <Terminal className="w-full h-full -rotate-12 translate-x-24 translate-y-12" />
        </div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold text-white font-display flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                <Map className="w-5 h-5 text-sky-500" />
              </div>
              Learning Path
            </h4>
          </div>
          
          <div className="space-y-4 relative">
            <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-slate-800 to-transparent" />
            {trackTasks.map((task, idx) => (
              <div key={task.id} className="relative pl-24 group">
                <div className={cn(
                  "absolute left-[34px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10 transition-all duration-500",
                  profile?.completedTasks.includes(task.id) 
                    ? "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] scale-125" 
                    : "bg-slate-800 border border-slate-700 group-hover:border-sky-500/50"
                )} />
                <button 
                  onClick={() => onSelectTask(task)}
                  className="w-full text-left glass-panel p-8 rounded-[2rem] hover:border-sky-500/50 transition-all group-hover:bg-slate-900/60 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Module 0{idx + 1}</p>
                      <h5 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors font-display">{task.title}</h5>
                      <p className="text-slate-400 text-sm mt-1 font-light">{task.description.split('.')[0]}.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {profile?.completedTasks.includes(task.id) ? (
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700 group-hover:border-sky-500/50 transition-all">
                          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-sky-500 transition-all group-hover:translate-x-1" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white font-display flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                <Zap className="w-5 h-5 text-sky-500" />
              </div>
              Performance
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <StatCard icon={<Award className="text-yellow-500" />} label="Total XP" value={profile?.totalScore || 0} />
              <StatCard icon={<CheckCircle2 className="text-emerald-500" />} label="Tasks Finished" value={profile?.completedTasks.length || 0} />
              <StatCard icon={<Zap className="text-sky-500" />} label="Current Streak" value="4 Days" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white font-display flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                <Info className="w-5 h-5 text-sky-500" />
              </div>
              Resources
            </h4>
            <div className="space-y-4">
              {[
                { title: 'The Art of Problem Solving', desc: 'Learn how to break down complex problems into smaller, manageable steps.' },
                { title: 'Clean Code Principles', desc: 'Write code that is easy to read, maintain, and scale.' },
                { title: 'System Design Basics', desc: 'Understand how different components of a software system interact.' }
              ].map((resource, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl hover:border-sky-500/30 transition-all cursor-pointer group">
                  <h5 className="text-sm font-bold text-white mb-1 group-hover:text-sky-400 transition-colors font-display">{resource.title}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{resource.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="glass-panel p-6 rounded-3xl flex items-center gap-5 hover:border-sky-500/30 transition-all group">
      <div className="w-14 h-14 bg-slate-800/30 rounded-2xl flex items-center justify-center border border-slate-700/30 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-3xl font-bold text-white font-display">{value}</p>
      </div>
    </div>
  );
}

function TrackIcon({ name, className }: { name: string, className?: string }) {
  const Icon = {
    Server, Shield, Terminal, Database, Layout, Cloud, Layers
  }[name] || Layers;
  return <Icon className={className} />;
}

function TracksListView({ onSelectTrack, selectedTrack, onSelectTask }: { onSelectTrack: (t: Track) => void, selectedTrack: Track | null, onSelectTask: (t: Task) => void }) {
  if (selectedTrack) {
    const taskProvider = TaskProviderFactory.getProvider();
    const trackTasks = taskProvider.getTasksByTrack(selectedTrack.id);
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        <button onClick={() => onSelectTrack(null as any)} className="text-slate-500 hover:text-white flex items-center gap-2 font-bold">
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back to Tracks
        </button>
        <div className="bg-slate-900/40 border border-slate-800/50 p-10 rounded-[2.5rem] relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-2 font-display">{selectedTrack.title}</h3>
            <p className="text-slate-400 text-lg max-w-2xl">{selectedTrack.description}</p>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
            <TrackIcon name={selectedTrack.icon} className="w-full h-full -rotate-12 translate-x-12 translate-y-12" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trackTasks.map(task => (
            <button 
              key={task.id}
              onClick={() => onSelectTask(task)}
              className="text-left bg-slate-900/50 border border-slate-800/50 p-8 rounded-3xl hover:border-sky-500/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-slate-700">
                  {task.category}
                </span>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  task.difficulty === 'beginner' ? "text-emerald-500" :
                  task.difficulty === 'intermediate' ? "text-amber-500" : "text-red-500"
                )}>
                  {task.difficulty}
                </span>
              </div>
              <h5 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{task.title}</h5>
              <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{task.description}</p>
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {TRACKS.map(track => (
        <button 
          key={track.id}
          onClick={() => onSelectTrack(track)}
          className="text-left bg-slate-900/40 border border-slate-800/50 p-10 rounded-[2.5rem] hover:border-sky-500/50 transition-all group relative overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center border border-sky-500/20 group-hover:scale-110 transition-transform">
              <TrackIcon name={track.icon} className="w-8 h-8 text-sky-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 font-display">{track.title}</h3>
              <p className="text-slate-400 leading-relaxed">{track.description}</p>
            </div>
            <div className="flex items-center gap-2 text-sky-500 font-bold text-sm">
              Initialize Track
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-500/5 blur-3xl rounded-full" />
        </button>
      ))}
    </motion.div>
  );
}

function ExamsView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 text-center py-20"
    >
      <div className="p-10 bg-slate-900/40 border border-slate-800/50 rounded-[3rem] space-y-6">
        <div className="w-24 h-24 bg-yellow-500/10 rounded-3xl flex items-center justify-center border border-yellow-500/20 mx-auto">
          <Shield className="w-12 h-12 text-yellow-500" />
        </div>
        <h3 className="text-4xl font-bold text-white font-display">Interview Simulator</h3>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Test your skills in high-pressure, timed scenarios. Complete these "Exams" to earn exclusive badges and get certified as a StackMaster Architect.
        </p>
        <div className="pt-8">
          <button className="bg-yellow-500 text-slate-950 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            Coming Soon: Junior Architect Exam
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function TaskView({ task, onBack, onComplete }: { task: Task, onBack: () => void, onComplete: (s: number) => void }) {
  const [code, setCode] = useState(task.initialCode);
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<{ success: boolean, review: string, score: number, optimizationTips?: string[] } | null>(null);
  const [activeTab, setActiveTab] = useState<'inbox' | 'basics' | 'instructions'>('inbox');
  const [activeStep, setActiveStep] = useState(0);
  const [visualState, setVisualState] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

  const handleRun = async () => {
    setEvaluating(true);
    setVisualState('running');
    setResult(null);
    
    try {
      // 1. Behavioral Strategy Pattern: Static Analysis via local engine
      const strategy = EvaluationFactory.getStrategyForTask(task.id);
      const engine = new EvaluationEngine(strategy);
      const staticResult = await engine.runEvaluation(code);

      // 2. AI Review via Secure Server Endpoint
      const aiResponse = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, taskDescription: task.description })
      });

      if (!aiResponse.ok) {
        const errData = await aiResponse.json();
        throw new Error(errData.error || "Failed to reach the Senior Architect evaluation engine.");
      }

      const data = await aiResponse.json();
      
      // Merge Strategy results with AI review for enterprise robustness
      const finalResult = {
        ...data,
        success: data.success && staticResult.success,
        review: staticResult.success ? data.review : `${staticResult.message}\n\n${data.review}`
      };
      
      // Artificial delay for visual effect
      setTimeout(() => {
        setResult(finalResult);
        setVisualState(finalResult.success ? 'success' : 'error');
        setEvaluating(false);
      }, 2000);
    } catch (e: any) {
      console.error("Gemini Error:", e);
      setResult({
        success: false,
        review: `Review Engine Error: ${e.message || "Failed to contact the evaluation server."}\n\nTroubleshooting:\n1. Ensure GEMINI_API_KEY is set in Settings > Secrets.\n2. Check for quota limits.\n3. Verify your internet connection.`,
        score: 0
      });
      setVisualState('error');
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
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-8">
          <button 
            onClick={onBack} 
            className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-90"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h3 className="text-3xl font-bold text-white font-display tracking-tight">
                {task.title}
              </h3>
              <span className={cn(
                "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] border",
                task.priority === 'urgent' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                task.priority === 'high' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                "bg-sky-500/10 text-sky-500 border-sky-500/20"
              )}>
                {task.priority || 'medium'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-mono tracking-wider">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
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
              className="flex items-center gap-3 px-6 py-3 glass-panel rounded-2xl"
            >
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-bold text-white font-display">+{result.score} XP</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
        {/* Left Sidebar: Inbox & Docs */}
        <div className="col-span-4 flex flex-col glass-panel rounded-[2.5rem] overflow-hidden min-h-0">
          <div className="flex border-b border-slate-800/50 shrink-0">
            {[
              { id: 'inbox', icon: Mail, label: 'Brief' },
              { id: 'basics', icon: BookOpen, label: 'Basics' },
              { id: 'instructions', icon: ClipboardList, label: 'Lab' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 py-4 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative",
                  activeTab === tab.id 
                    ? "text-sky-400" 
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="task-tab" className="absolute bottom-0 inset-x-0 h-0.5 bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'inbox' && (
                <motion.div
                  key="inbox"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-8"
                >
                  <div className="bg-slate-950/50 border border-slate-800/50 rounded-[2rem] p-8 space-y-6">
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden">
                          <img src={task.sender?.avatar} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-white font-display">{task.sender?.name}</p>
                          <p className="text-xs text-slate-500">{task.sender?.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">09:41 AM</span>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-xl font-bold text-white leading-tight font-display tracking-tight">{task.subject || 'Task Assignment'}</h4>
                      <div className="text-slate-400 text-sm leading-relaxed space-y-4 font-light">
                        <p>Hi there,</p>
                        <p>{task.description}</p>
                        <p>Please review the technical requirements in the Lab tab and the fundamental concepts in the Basics tab before starting.</p>
                        <p>Best regards,<br/>{task.sender?.name}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'basics' && (
                <motion.div
                  key="basics"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Core Concepts</h4>
                    {task.basics?.map((item, idx) => (
                      <div key={idx} className="glass-panel rounded-2xl p-6 space-y-3 hover:border-sky-500/30 transition-all">
                        <h5 className="text-sm font-bold text-white flex items-center gap-3 font-display">
                          <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                          {item.title}
                        </h5>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'instructions' && (
                <motion.div
                  key="instructions"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Technical Steps</h4>
                      <span className="text-[10px] font-mono text-slate-600">{activeStep + 1} / {task.instructions.length}</span>
                    </div>
                    <div className="space-y-3">
                      {task.instructions.map((step, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={cn(
                            "w-full text-left p-5 rounded-2xl border transition-all text-sm group relative overflow-hidden",
                            activeStep === idx 
                              ? "bg-sky-500/5 border-sky-500/30 text-white" 
                              : "bg-slate-950/50 border-slate-800/50 text-slate-400 hover:border-slate-700"
                          )}
                        >
                          <div className="flex items-center gap-4 relative z-10">
                            <div className={cn(
                              "w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all",
                              activeStep === idx ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]" : "bg-slate-900 text-slate-500 group-hover:text-slate-300"
                            )}>
                              {idx + 1}
                            </div>
                            <span className="font-bold font-display">{step.title}</span>
                          </div>
                          {activeStep === idx && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 text-slate-400 leading-relaxed pl-12 text-xs font-light"
                            >
                              {step.content}
                            </motion.p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result Summary (Mini) */}
          {result && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              className={cn(
                "p-8 border-t font-display relative overflow-hidden",
                result.success ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"
              )}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", result.success ? "text-emerald-500" : "text-red-500")}>
                    {result.success ? "Review Approved" : "Review Rejected"}
                  </p>
                  <span className="text-white font-bold text-xl">{result.score}/100</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 font-light">{result.review}</p>
                {result.success && (
                  <button 
                    onClick={() => onComplete(result.score)}
                    className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-white py-4 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                  >
                    Complete & Continue
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Main Content: Visualizer & Editor */}
        <div className="col-span-8 flex flex-col gap-8 min-h-0">
          {/* Visualizer */}
          <div className="h-1/3 glass-panel rounded-[2.5rem] p-10 relative overflow-hidden shrink-0">
            <div className="blueprint-grid absolute inset-0 opacity-20" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xs font-bold text-white font-display flex items-center gap-3 tracking-[0.2em] uppercase">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                    <Zap className="w-4 h-4 text-sky-500" />
                  </div>
                  System Visualization
                </h4>
                <div className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-500",
                  visualState === 'idle' ? "bg-slate-900 border-slate-800 text-slate-500" :
                  visualState === 'running' ? "bg-sky-500/10 border-sky-500/30 text-sky-500 animate-pulse" :
                  visualState === 'success' ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" :
                  "bg-red-500/10 border-red-500/30 text-red-500"
                )}>
                  {visualState}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                {VisualizerAdapter.render({ type: task.visualType || 'architecture', state: visualState })}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 bg-[#05070a] border border-slate-800/50 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl min-h-0 relative">
            <div className="bg-slate-900/30 px-8 py-4 border-b border-slate-800/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
                </div>
                <div className="flex items-center gap-3 px-4 py-1.5 bg-slate-950 rounded-xl border border-slate-800/50">
                  <Code2 className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-mono text-slate-400">main.js</span>
                </div>
              </div>
              <button 
                onClick={() => setCode(task.initialCode)}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white transition-all"
                title="Reset Code"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 relative min-h-0 overflow-y-auto custom-scrollbar">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                padding={40}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 14,
                  minHeight: '100%',
                  backgroundColor: 'transparent',
                }}
                className="w-full text-sky-300 outline-none leading-relaxed selection:bg-sky-500/20"
              />
            </div>
            <div className="p-8 bg-slate-900/30 border-t border-slate-800/50 shrink-0">
              <button 
                onClick={handleRun}
                disabled={evaluating}
                className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/50 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(14,165,233,0.2)] active:scale-[0.98]"
              >
                {evaluating ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Play className="w-6 h-6 fill-current" />
                )}
                <span className="text-lg tracking-tight">Submit Code for Review</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SystemVisualizer({ state, type }: { state: 'idle' | 'running' | 'success' | 'error', type: 'architecture' | 'logic' | 'memory' }) {
  if (type === 'logic') {
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

  if (type === 'memory') {
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

  return (
    <div className="w-full max-w-3xl flex items-center justify-between relative px-12">
      {/* Connections */}
      <div className="absolute inset-x-24 top-1/2 -translate-y-1/2 h-1 bg-slate-800/50 rounded-full overflow-hidden">
        {state === 'running' && (
          <>
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-[0_0_15px_rgba(14,165,233,0.8)]"
            />
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
              className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent shadow-[0_0_15px_rgba(14,165,233,0.8)]"
            />
          </>
        )}
        {state === 'success' && (
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute inset-0 bg-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] origin-left"
          />
        )}
        {state === 'error' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="absolute inset-0 bg-red-500/30"
          />
        )}
      </div>

      {/* Nodes */}
      <VisualNode 
        icon={<UserIcon className="w-8 h-8" />} 
        label="Client" 
        active={state !== 'idle'} 
        color="sky"
      />
      <VisualNode 
        icon={<Server className="w-8 h-8" />} 
        label="API Server" 
        active={state !== 'idle'} 
        status={state === 'error' ? 'error' : state === 'success' ? 'success' : 'idle'}
        color="purple"
      />
      <VisualNode 
        icon={<Database className="w-8 h-8" />} 
        label="Database" 
        active={state === 'success'} 
        color="emerald"
      />
    </div>
  );
}

function VisualNode({ icon, label, active, status, color }: { icon: React.ReactNode, label: string, active: boolean, status?: string, color: string }) {
  const colors: Record<string, string> = {
    sky: 'text-sky-400 bg-sky-500/5 border-sky-500/30 shadow-[0_0_40px_rgba(14,165,233,0.15)]',
    purple: 'text-purple-400 bg-purple-500/5 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]',
    emerald: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]'
  };

  return (
    <div className="relative flex flex-col items-center gap-5 z-10 group">
      <motion.div 
        animate={active ? { 
          scale: [1, 1.02, 1],
          boxShadow: status === 'error' ? '0 0 50px rgba(239, 68, 68, 0.3)' : 
                     status === 'success' ? '0 0 50px rgba(16, 185, 129, 0.3)' : 
                     undefined
        } : {}}
        transition={{ repeat: Infinity, duration: 3 }}
        className={cn(
          "w-28 h-28 rounded-[2.5rem] border flex items-center justify-center transition-all duration-700 relative",
          active ? colors[color] : "bg-slate-900/40 border-slate-800/50 text-slate-700"
        )}
      >
        <div className={cn("transition-all duration-700", active ? "scale-110 glow-text" : "scale-100")}>
          {icon}
        </div>
        
        {status === 'error' && (
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-1 -right-1 bg-red-500 p-2.5 rounded-2xl border-4 border-[#020408] shadow-xl"
          >
            <AlertCircle className="w-4 h-4 text-white" />
          </motion.div>
        )}
        {status === 'success' && (
          <motion.div 
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-1 -right-1 bg-emerald-500 p-2.5 rounded-2xl border-4 border-[#020408] shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </motion.div>
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-700 font-display",
        active ? "text-white glow-text" : "text-slate-700"
      )}>
        {label}
      </span>
    </div>
  );
}

function ProfileView({ profile }: { profile: UserProfile | null }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-16 pb-20"
    >
      <div className="glass-panel p-12 rounded-[3rem] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <div className="w-40 h-40 rounded-[3rem] border-4 border-sky-500/20 p-2">
              <img 
                src={auth.currentUser?.photoURL || `https://ui-avatars.com/api/?name=${profile?.displayName}&background=0ea5e9&color=fff`} 
                alt={profile?.displayName || 'User'} 
                className="w-full h-full object-cover rounded-[2.5rem]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl border-4 border-[#020408] flex items-center justify-center shadow-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h3 className="text-4xl font-bold text-white font-display tracking-tight">{profile?.displayName}</h3>
              <p className="text-sky-400 font-mono text-sm tracking-widest uppercase">Senior Systems Engineer</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {['React', 'Node.js', 'TypeScript', 'MongoDB'].map(skill => (
                <span key={skill} className="px-4 py-1.5 bg-slate-800/50 text-slate-400 rounded-full text-xs border border-slate-700/50">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard icon={<Zap className="text-sky-500" />} label="Total XP" value={profile?.totalScore || 0} />
        <StatCard icon={<CheckCircle2 className="text-emerald-500" />} label="Tasks Completed" value={profile?.completedTasks.length || 0} />
        <StatCard icon={<Layers className="text-purple-500" />} label="Tracks Active" value="1" />
      </div>

      <div className="flex justify-center">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-500/5 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all font-bold group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Terminate Session
        </button>
      </div>
    </motion.div>
  );
}
