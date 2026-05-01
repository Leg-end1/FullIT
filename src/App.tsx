import React, { useState, useEffect, useRef } from "react";
import { auth, signInWithGoogle, logout, db } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import {
  LogIn,
  LogOut,
  BookOpen,
  Code,
  Award,
  User as UserIcon,
  CheckCircle2,
  ChevronRight,
  Layers,
  Map,
  Zap,
  Database,
  Shield,
  Server,
  ArrowRight,
  Info,
  Play,
  RefreshCw,
  XCircle,
  AlertCircle,
  Mail,
  ClipboardList,
  Code2,
  Layout,
  Cloud,
  Cpu,
  Terminal,
  Clock,
  Target,
  Lightbulb,
  Sun,
  Moon,
  Activity,
  ShieldCheck,
  Binary,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { cn } from "./lib/utils";
import { UserProfile, Task, Track, TaskStep, Interview } from "./types";
import { ALL_TASKS, TRACKS, INTERVIEWS } from "./constants";
import { userService, taskService } from "./services/dataService";
import { aiService } from "./services/aiService";
import { TaskProviderFactory } from "./lib/TaskFactory";
import { EvaluationFactory, EvaluationEngine } from "./lib/EvaluationStrategy";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "tracks" | "profile" | "exams" | "ranking" | "admin"
  >("dashboard");
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedInterview, setSelectedInterview] =
    useState<Interview | null>(null);

  const visualRef = useRef<HTMLDivElement>(null);

  const trackCompletedCount = profile
    ? profile.completedTasks.filter(tid => ALL_TASKS.find(t => t.id === tid)?.trackId === profile.currentTrackId).length 
    : 0;
  const trackTotalCount = ALL_TASKS.filter(t => t.trackId === profile?.currentTrackId).length || 1;
  const trackProgress = Math.min(100, Math.round((trackCompletedCount / trackTotalCount) * 100));

  const isAdmin = profile?.role === 'admin' || user?.email === "240118012@sdu.edu.kz";

  useEffect(() => {
    let profileUnsubscribe: (() => void) | null = null;
    const authUnsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setUser(currentUser);
        if (profileUnsubscribe) {
          profileUnsubscribe();
          profileUnsubscribe = null;
        }
        if (currentUser) {
          let existingProfile = await userService.getProfile(currentUser.uid);
          if (!existingProfile) {
            const isDefaultAdmin = currentUser.email === "240118012@sdu.edu.kz";
            const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.uid}`;
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || "Engineer",
              email: currentUser.email || "",
              photoURL: avatarUrl,
              completedTasks: [],
              totalScore: 0,
              role: isDefaultAdmin ? "admin" : "student",
              currentTrackId: "programming-foundations",
              createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, "users", currentUser.uid), newProfile);
            await setDoc(doc(db, "leaderboard", currentUser.uid), {
              uid: currentUser.uid,
              displayName: newProfile.displayName,
              photoURL: avatarUrl,
              totalScore: 0,
              completedTasks: [],
            });
            setProfile(newProfile);
          } else {
            setProfile(existingProfile);
          }
          profileUnsubscribe = userService.subscribeToProfile(
            currentUser.uid,
            (updatedProfile) => {
              setProfile(updatedProfile);
            },
          );
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
      <div className="min-h-screen bg-white flex items-center justify-center blueprint-grid transition-colors duration-200">
        {" "}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-black border-t-transparent rounded-full shadow-sm"
        />{" "}
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-black blueprint-grid transition-colors duration-200">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full text-center space-y-12"
        >
          {" "}
          <div className="flex justify-center">
            {" "}
            <div className="p-6 bg-neutral-100 rounded-3xl border border-neutral-200 shadow-sm">
              {" "}
              <Terminal className="w-20 h-20 text-black " />{" "}
            </div>{" "}
          </div>{" "}
          <div className="space-y-4">
            {" "}
            <h1 className="text-6xl font-bold tracking-tight font-display">
              {" "}
              FullIT<span className="text-black "> .</span>{" "}
            </h1>{" "}
            <p className="text-neutral-500 text-xl leading-relaxed">
              {" "}
              The interactive laboratory for full-stack engineers. Learn by
              building, visualizing, and mastering real systems.
            </p>{" "}
          </div>{" "}
          <button
            onClick={signInWithGoogle}
            className="group relative flex items-center justify-center gap-3 bg-neutral-100 text-black px-8 py-5 rounded-2xl font-bold text-lg hover:bg-black text-white hover:bg-neutral-800 transition-all shadow-sm hover:shadow-sm mx-auto"
          >
            {" "}
            <LogIn className="w-6 h-6" /> Initialize Session{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />{" "}
          </button>{" "}
        </motion.div>{" "}
      </div>
    );
  }
  return (
    <div className="h-screen bg-white text-neutral-900 flex font-sans overflow-hidden transition-colors duration-200">
      {" "}
      {}{" "}
      <aside className="w-72 h-full border-r border-neutral-100 flex flex-col bg-white z-20">
        {" "}
        <div className="flex items-center gap-3 p-8 shrink-0">
          {" "}
          <div className="p-2.5 bg-black rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
            {" "}
            <Terminal className="w-6 h-6 text-white " />{" "}
          </div>{" "}
          <span className="font-bold text-2xl tracking-tighter text-black font-display">
            {" "}
            FullIT<span className="text-neutral-300">_</span>
          </span>{" "}
        </div>{" "}
        <nav className="flex-1 overflow-y-auto space-y-1 px-4 custom-scrollbar">
          {" "}
          <NavItem
            icon={<Map className="w-5 h-5" />}
            label="Roadmap"
            active={activeTab === "dashboard"}
            onClick={() => {
              setActiveTab("dashboard");
              setSelectedTask(null);
              setSelectedTrack(null);
            }}
          />{" "}
          <NavItem
            icon={<Zap className="w-5 h-5" />}
            label="Tracks"
            active={activeTab === "tracks"}
            onClick={() => {
              setActiveTab("tracks");
              setSelectedTask(null);
              setSelectedTrack(null);
            }}
          />{" "}
          <NavItem
            icon={<Target className="w-5 h-5" />}
            label="Ranking"
            active={activeTab === "ranking"}
            onClick={() => {
              setActiveTab("ranking");
              setSelectedTask(null);
              setSelectedTrack(null);
            }}
          />{" "}
          <NavItem
            icon={<Shield className="w-5 h-5" />}
            label="Interview"
            active={activeTab === "exams"}
            onClick={() => {
              setActiveTab("exams");
              setSelectedTask(null);
              setSelectedTrack(null);
            }}
          />{" "}
          <div className="pt-4 mt-4 border-t border-neutral-50 px-4">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Account</p>
            <NavItem
              icon={<UserIcon className="w-5 h-5" />}
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => {
                setActiveTab("profile");
                setSelectedTask(null);
                setSelectedTrack(null);
              }}
            />{" "}
            {isAdmin && (
              <NavItem
                icon={<Shield className="w-5 h-5" />}
                label="Admin Panel"
                active={activeTab === "admin"}
                onClick={() => {
                  setActiveTab("admin");
                  setSelectedTask(null);
                  setSelectedTrack(null);
                }}
              />
            )}
          </div>
        </nav>{" "}
        <div className="p-6 shrink-0 mt-auto">
          {" "}
          {profile?.currentTrackId && (
            <div className="bg-neutral-50 p-5 rounded-3xl border border-neutral-100 mb-6">
              {" "}
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                  {" "}
                  Progression
                </p>{" "}
                <span className="text-[10px] font-bold text-black bg-white px-2 py-0.5 rounded-full border border-neutral-200">
                  {trackProgress}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                {" "}
                <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center shadow-lg">
                  {" "}
                  <Server className="w-4 h-4 text-white " />{" "}
                </div>{" "}
                <div className="flex-1 min-w-0">
                  {" "}
                  <p className="text-xs font-bold text-black truncate">
                    {" "}
                    {TRACKS.find((t) => t.id === profile.currentTrackId)
                      ?.title || "Fundamentals"}{" "}
                  </p>{" "}
                  <div className="w-full bg-neutral-200 h-1 rounded-full mt-2 overflow-hidden">
                    {" "}
                    <div
                      className="bg-black h-full transition-all duration-500"
                        style={{
                          width: `${trackProgress}%`,
                        }}
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          )}{" "}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all font-medium text-sm group"
          >
            {" "}
            <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> <span> Terminate Session</span>{" "}
          </button>{" "}
        </div>{" "}
      </aside>{" "}
      {}{" "}
      <main className="flex-1 overflow-auto blueprint-grid relative">
        {" "}
        <header className="h-24 border-b border-neutral-100 flex items-center justify-between px-12 bg-white/80 backdrop-blur-xl sticky top-0 z-30 transition-all">
          {" "}
          <div className="flex items-center gap-6">
            {" "}
            <div>
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-1">Current Node</p>
              <h2 className="text-2xl font-black text-black font-display tracking-tighter uppercase italic">
                {" "}
                {selectedTask
                  ? selectedTask.title
                  : selectedTrack
                    ? selectedTrack.title
                    : activeTab}{" "}
              </h2>{" "}
            </div>
            {selectedTask && (
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100 animate-pulse">
                {" "}
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active Session{" "}
              </div>
            )}{" "}
          </div>{" "}
          <div className="flex items-center gap-8">
            {" "}
            <div className="flex items-center gap-4 bg-neutral-50 px-6 py-3 rounded-2xl border border-neutral-100 hover:border-black transition-all group cursor-default">
              {" "}
              <div className="p-1.5 bg-white rounded-lg border border-neutral-100 group-hover:bg-black transition-colors">
                <Award className="w-4 h-4 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Experience</span>
                <span className="text-lg font-black text-black font-display tracking-tight leading-none">
                  {" "}
                  {profile?.totalScore || 0}{" "}
                  <span className="text-neutral-300">XP</span>{" "}
                </span>{" "}
              </div>
            </div>{" "}
            <div className="h-10 w-px bg-neutral-100" />{" "}
            <div className="flex items-center gap-3 group cursor-pointer transition-all" onClick={() => setActiveTab('profile')}>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-black leading-none mb-1 group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{user.displayName?.split(' ')[0]}</p>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] leading-none grow">
                  {profile?.role === 'admin' ? 'ROOT_ACCESS' : `V-LEVL ${Math.floor((profile?.totalScore || 0) / 500) + 1}`}
                </p>
              </div>
              <img
                src={profile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
                alt={user.displayName || ""}
                className="w-12 h-12 rounded-2xl border-2 border-black shadow-lg group-hover:scale-110 group-hover:shadow-emerald-500/20 transition-all bg-neutral-100"
                referrerPolicy="no-referrer"
              />{" "}
            </div>
          </div>{" "}
        </header>{" "}
        <div className="p-10 max-w-7xl mx-auto">
          {" "}
          <AnimatePresence mode="wait">
            {" "}
            {selectedTask ? (
              <TaskView
                task={selectedTask}
                isCompleted={
                  profile?.completedTasks.includes(selectedTask.id) || false
                }
                onBack={() => setSelectedTask(null)}
                onComplete={async (score) => {
                  if (
                    user &&
                    !profile?.completedTasks.includes(selectedTask.id)
                  ) {
                    await userService.updateProgress(
                      user.uid,
                      selectedTask.id,
                      score,
                    );
                  }
                  setSelectedTask(null);
                }}
              />
            ) : activeTab === "dashboard" ? (
              <DashboardView
                profile={profile}
                onSelectTrack={(track) => {
                  setSelectedTrack(track);
                  setActiveTab("tracks");
                }}
                onSelectTask={setSelectedTask}
              />
            ) : activeTab === "tracks" ? (
              <TracksListView
                onSelectTrack={async (track) => {
                  setSelectedTrack(track);
                  if (user && track) {
                    try {
                      await userService.setTrack(user.uid, track.id);
                    } catch (e) {
                      console.error("Failed to set track:", e);
                    }
                  }
                }}
                selectedTrack={selectedTrack}
                onSelectTask={setSelectedTask}
              />
            ) : activeTab === "exams" ? (
              <ExamsView 
                onSelectInterview={setSelectedInterview} 
                selectedInterview={selectedInterview} 
                onBack={() => setSelectedInterview(null)} 
                onComplete={async (score) => {
                  if (user && selectedInterview && !profile?.completedTasks.includes(selectedInterview.id)) {
                    await userService.updateProgress(user.uid, selectedInterview.id, score);
                  }
                }}
              />
            ) : activeTab === "ranking" ? (
              <RankingView />
            ) : activeTab === "admin" ? (
              <AdminView />
            ) : (
              <ProfileView profile={profile} />
            )}{" "}
          </AnimatePresence>{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
}
function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold relative group",
        active ? "text-black bg-neutral-100 shadow-sm" : "text-neutral-400 hover:text-black hover:bg-neutral-50",
      )}
    >
      {" "}
      <div
        className={cn(
          "relative z-10 transition-transform duration-300",
          active ? "scale-110" : "group-hover:scale-110",
        )}
      >
        {" "}
        {icon}{" "}
      </div>{" "}
      <span className="relative z-10 text-sm tracking-tight"> {label} </span>{" "}
      {active && (
        <motion.div
          layoutId="nav-glow"
          className="absolute right-3 w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        />
      )}
    </button>
  );
}
function DashboardView({
  profile,
  onSelectTrack,
  onSelectTask,
}: {
  profile: UserProfile | null;
  onSelectTrack: (t: Track) => void;
  onSelectTask: (t: Task) => void;
}) {
  const currentTrack =
    TRACKS.find((t) => t.id === profile?.currentTrackId) || TRACKS[0];
  const trackTasks = ALL_TASKS.filter((t) => t.trackId === currentTrack?.id);

  // Dynamic calculations
  const unitsDone = profile?.completedTasks.length || 0;
  const totalUnits = ALL_TASKS.length;
  const velocity = Math.floor((profile?.totalScore || 0) / 120) + 4;
  
  const createdAt = profile?.createdAt ? new Date(profile.createdAt) : new Date();
  const uptimeMs = new Date().getTime() - createdAt.getTime();
  const uptimeHours = Math.max(1, Math.floor(uptimeMs / (1000 * 60 * 60)));
  
  const precision = Math.min(99, 75 + Math.floor((profile?.totalScore || 0) / 200) + ((profile?.totalScore || 0) % 10));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 pb-20 max-w-[1100px] mx-auto"
    >
      {" "}
      <div className="relative p-12 sm:p-16 rounded-[3rem] bg-black text-white overflow-hidden shadow-2xl">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-8 flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-3 text-white/50 text-[10px] font-bold tracking-[0.3em] uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            System Live: Full-Stack Laboratory
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight leading-[0.9]">
            Build the <br/>
            <span className="text-white/30 italic">Future</span> Architecture.
          </h1>
          
          <p className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
            Master the complete technological stack through rigorous 
            simulation and automated system evaluation.
          </p>
          
          <button
            onClick={() => onSelectTrack(currentTrack)}
            className="group bg-white text-black px-10 py-5 rounded-[2rem] font-black text-lg flex items-center gap-4 hover:bg-neutral-200 transition-all active:scale-95 shadow-xl"
          >
            Deploy First Module 
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 blur-[100px] rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {" "}
        <StatCardOutline
          icon={<BookOpen className="w-5 h-5 group-hover:text-white transition-colors" />}
          label="Knowledge Base"
          value={unitsDone}
          subtext={`of ${totalUnits} units`}
        />{" "}
        <StatCardOutline
          icon={<Zap className="w-5 h-5 group-hover:text-white transition-colors" />}
          label="Current Velocity"
          value={velocity}
          subtext="units / week"
        />{" "}
        <StatCardOutline
          icon={<Clock className="w-5 h-5 group-hover:text-white transition-colors" />}
          label="System Runtime"
          value={`${uptimeHours}h`}
          subtext="uptime total"
        />{" "}
        <StatCardOutline
          icon={<Target className="w-5 h-5 group-hover:text-white transition-colors" />}
          label="Core Mastery"
          value={`${precision}%`}
          subtext="precision index"
        />{" "}
      </div>{" "}
      
      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-xs font-black text-neutral-400 uppercase tracking-[0.3em] flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neutral-300" />
            Active Development Pipeline
          </h3>
          <span className="text-[10px] font-bold text-neutral-400">
            {trackTasks.length} NODES IDENTIFIED
          </span>
        </div>
        
        <div className="bg-white border border-neutral-100 rounded-[2.5rem] overflow-hidden shadow-sm">
          {" "}
          <div className="p-8 border-b border-neutral-50 flex justify-between items-center bg-neutral-50/50">
            {" "}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                <Server className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-black text-black tracking-tight text-xl">
                  {currentTrack?.title}
                </h3>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Primary Objective</p>
              </div>
            </div>
          </div>{" "}
          <div className="divide-y divide-neutral-50">
            {" "}
            {trackTasks.map((task, idx) => {
              const isCompleted = profile?.completedTasks.includes(task.id);
              return (
                <div
                  key={task.id}
                  className="p-8 hover:bg-neutral-50 transition-all flex items-center justify-between group cursor-pointer"
                  onClick={() => onSelectTask(task)}
                >
                  {" "}
                  <div className="flex items-center gap-6">
                    {" "}
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all duration-500",
                      isCompleted 
                        ? "bg-emerald-50 border-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                        : "bg-white border-neutral-100 group-hover:border-black group-hover:scale-105 shadow-sm"
                    )}>
                      {" "}
                      {isCompleted ? (
                        <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                      ) : (
                        <span className="text-xl font-black font-display text-neutral-300 group-hover:text-black">{idx + 1}</span>
                      )}{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <h5
                        className="font-black text-xl text-black tracking-tight mb-1"
                      >
                        {" "}
                        {task.title}{" "}
                      </h5>{" "}
                      <p className="text-neutral-400 text-sm font-medium tracking-tight">
                        {" "}
                        {task.description.split(".")[0] + "."}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-xl bg-neutral-100 text-[10px] font-bold text-neutral-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Execute Node
                    </div>
                    <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}{" "}
          </div>{" "}
        </div>
      </div>{" "}
    </motion.div>
  );
}
function StatCardOutline({
  icon,
  label,
  value,
  subtext,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext: string;
}) {
  return (
    <div className="p-8 rounded-[2.5rem] border border-neutral-100 bg-white flex flex-col justify-between hover:border-black hover:shadow-xl transition-all group shadow-sm">
      {" "}
      <div className="flex justify-between items-start mb-6">
        {" "}
        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest "> {label} </p>{" "}
        <div className="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-black group-hover:text-white transition-colors"> {icon} </div>{" "}
      </div>{" "}
      <div className="flex items-baseline gap-2">
        {" "}
        <p className="text-4xl font-black text-black font-display tracking-tighter">
          {" "}
          {value}{" "}
        </p>{" "}
        <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-[0.2em]"> {subtext} </span>{" "}
      </div>{" "}
    </div>
  );
}
function TrackIcon({ name, className }: { name: string; className?: string }) {
  const Icon =
    { Server, Shield, Terminal, Database, Layout, Cloud, Layers }[name] ||
    Layers;
  return <Icon className={className} />;
}
function TracksListView({
  onSelectTrack,
  selectedTrack,
  onSelectTask,
}: {
  onSelectTrack: (t: Track) => void;
  selectedTrack: Track | null;
  onSelectTask: (t: Task) => void;
}) {
  if (selectedTrack) {
    const taskProvider = TaskProviderFactory.getProvider();
    const trackTasks = taskProvider.getTasksByTrack(selectedTrack?.id || "");
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        {" "}
        <button
          onClick={() => onSelectTrack(null as any)}
          className="text-neutral-400 hover:text-black flex items-center gap-2 font-bold"
        >
          {" "}
          <ChevronRight className="w-5 h-5 rotate-180" /> Back to Tracks{" "}
        </button>{" "}
        <div className="bg-neutral-100/40 border border-neutral-200 p-10 rounded-[2.5rem] relative overflow-hidden">
          {" "}
          <div className="relative z-10">
            {" "}
            <h3 className="text-3xl font-bold text-black mb-2 font-display">
              {" "}
              {selectedTrack.title}{" "}
            </h3>{" "}
            <p className="text-neutral-500 text-lg max-w-2xl">
              {" "}
              {selectedTrack.description}{" "}
            </p>{" "}
          </div>{" "}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
            {" "}
            <TrackIcon
              name={selectedTrack.icon}
              className="w-full h-full -rotate-12 translate-x-12 translate-y-12"
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {" "}
          {trackTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => onSelectTask(task)}
              className="text-left bg-neutral-100/50 border border-neutral-200 p-8 rounded-3xl hover:border-black transition-all group"
            >
              {" "}
              <div className="flex justify-between items-start mb-4">
                {" "}
                <span className="px-3 py-1 bg-neutral-200 text-neutral-500 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-neutral-300 ">
                  {" "}
                  {task.category}{" "}
                </span>{" "}
                <span
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    task.difficulty === "beginner"
                      ? "text-green-600 "
                      : task.difficulty === "intermediate"
                        ? "text-amber-500"
                        : "text-red-600 ",
                  )}
                >
                  {" "}
                  {task.difficulty}{" "}
                </span>{" "}
              </div>{" "}
              <h5 className="text-xl font-bold text-black mb-2 group-hover:text-neutral-700 transition-colors">
                {" "}
                {task.title}{" "}
              </h5>{" "}
              <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">
                {" "}
                {task.description}{" "}
              </p>{" "}
            </button>
          ))}{" "}
        </div>{" "}
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
      {" "}
      {TRACKS.map((track) => (
        <button
          key={track?.id}
          onClick={() => onSelectTrack(track)}
          className="text-left bg-neutral-100/40 border border-neutral-200 p-10 rounded-[2.5rem] hover:border-black transition-all group relative overflow-hidden"
        >
          {" "}
          <div className="relative z-10 space-y-6">
            {" "}
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center border border-neutral-200 group-hover:scale-110 transition-transform">
              {" "}
              <TrackIcon
                name={track?.icon || "Layers"}
                className="w-8 h-8 text-black "
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <h3 className="text-2xl font-bold text-black mb-2 font-display">
                {" "}
                {track?.title}{" "}
              </h3>{" "}
              <p className="text-neutral-500 leading-relaxed">
                {" "}
                {track?.description}{" "}
              </p>{" "}
            </div>{" "}
            <div className="flex items-center gap-2 text-black font-bold text-sm">
              {" "}
              Initialize Track{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />{" "}
            </div>{" "}
          </div>{" "}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-neutral-50 blur-3xl rounded-full" />{" "}
        </button>
      ))}{" "}
    </motion.div>
  );
}
function ExamsView({ 
  onSelectInterview, 
  selectedInterview,
  onBack,
  onComplete
}: { 
  onSelectInterview: (i: Interview) => void;
  selectedInterview: Interview | null;
  onBack: () => void;
  onComplete: (score: number) => void;
}) {
  if (selectedInterview) {
    return <SimulationRoom interview={selectedInterview} onBack={onBack} onComplete={onComplete} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div className="text-center space-y-4">
        <h3 className="text-4xl font-black text-black font-display tracking-tight uppercase italic">
          Simulation Room
        </h3>
        <p className="text-neutral-500 max-w-2xl mx-auto font-medium">
          Step into high-stakes technical simulations. These are multi-stage assessments graded by our specialized AI recruiters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INTERVIEWS.map((interview) => (
          <motion.div
            key={interview.id}
            whileHover={{ y: -5 }}
            className="group bg-white border border-neutral-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all"
          >
            <div className="p-10 space-y-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={interview.interviewer.avatar}
                    className="w-16 h-16 rounded-2xl border-2 border-black bg-neutral-50 shadow-lg"
                    alt={interview.interviewer.name}
                  />
                  <div>
                    <h4 className="font-black text-black text-xl tracking-tight">
                      {interview.title}
                    </h4>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                      {interview.company} • {interview.role}
                    </p>
                  </div>
                </div>
                <div className={cn(
                  "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                  interview.difficulty === 'senior' ? "bg-red-50 text-red-500 border border-red-100" :
                  interview.difficulty === 'mid' ? "bg-sky-50 text-sky-500 border border-sky-100" :
                  "bg-emerald-50 text-emerald-500 border border-emerald-100"
                )}>
                  {interview.difficulty}
                </div>
              </div>

              <p className="text-neutral-600 font-medium leading-relaxed italic">
                "{interview.interviewer.personality}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-neutral-50 rounded-lg">
                    <Award className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">500 XP POTENTIAL</span>
                </div>
                <button
                  onClick={() => onSelectInterview(interview)}
                  className="bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-2 group/btn"
                >
                  Enter Simulation
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SimulationRoom({ interview, onBack, onComplete }: { interview: Interview; onBack: () => void; onComplete: (score: number) => void }) {
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string; code?: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [code, setCode] = useState("// Your code will appear here or you can start drafting...\n");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [phase, setPhase] = useState<'theory' | 'practical' | 'review' | 'complete'>('theory');
  const [totalScore, setTotalScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isEvaluating]);

  useEffect(() => {
    const startInterview = async () => {
      setIsEvaluating(true);
      const result = await aiService.conductInterviewStep(interview, [], "");
      setMessages([{ sender: 'ai', text: result.responseText }]);
      setPhase(result.phase);
      setIsEvaluating(false);
    };
    startInterview();
  }, []);

  const handleSubmit = async (submitCode: boolean = false) => {
    if ((!userInput.trim() && !submitCode) || isEvaluating) return;

    const currentText = userInput;
    const currentCode = code;
    
    const newUserMessage: { sender: 'user'; text: string; code?: string } = { 
      sender: 'user', 
      text: submitCode ? "[Coding Task Submitted]" : currentText 
    };
    if (submitCode) newUserMessage.code = currentCode;

    setMessages(prev => [...prev, newUserMessage]);
    setUserInput("");
    setIsEvaluating(true);

    try {
      const historyForAI = [...messages, newUserMessage];
      const result = await aiService.conductInterviewStep(interview, historyForAI, currentCode);
      
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: result.responseText 
      }]);

      const newTotalScore = totalScore + result.scoreDelta;
      setTotalScore(newTotalScore);
      setPhase(result.phase);
      if (result.feedback) setFeedbackHistory(prev => [...prev, result.feedback]);

      if (result.phase === 'complete') {
        setIsComplete(true);
        // Base XP (100) + performance score
        const finalReward = 100 + Math.max(0, Math.round(newTotalScore));
        onComplete(finalReward);
      }
      setIsEvaluating(false);
    } catch (err) {
      console.error(err);
      setIsEvaluating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-neutral-950 flex flex-col font-sans"
    >
      {/* Header */}
      <div className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="group p-2 hover:bg-white/10 rounded-xl transition-all border border-white/5">
            <XCircle className="w-5 h-5 text-neutral-500 group-hover:text-white" />
          </button>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={interview.interviewer.avatar} className="w-10 h-10 rounded-xl border border-white/20 shadow-2xl relative z-10" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl animate-pulse" />
            </div>
            <div>
              <h4 className="font-black text-white text-sm tracking-tight capitalize leading-none mb-1">
                {interview.interviewer.name}
              </h4>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Session • {interview.company}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
           <div className="text-right">
             <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Current Evaluation</p>
             <p className={cn(
               "text-xl font-black font-display tracking-tighter",
               totalScore >= 70 ? "text-emerald-500" : totalScore >= 40 ? "text-yellow-500" : "text-white"
             )}>
               {totalScore} <span className="text-[10px] opacity-50">/ 100</span>
             </p>
           </div>
           <div className="h-10 w-px bg-white/10" />
           <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                {phase === 'theory' ? 'Theoretical Phase' : phase === 'practical' ? 'Coding Lab' : phase === 'review' ? 'Technical Review' : 'Final Report'}
              </span>
           </div>
        </div>
      </div>

      {/* Main Simulation View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chat Pane */}
        <div className="w-1/3 border-r border-white/5 flex flex-col bg-neutral-900/50">
          <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.sender === 'user' ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "flex flex-col max-w-[90%]",
                  msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "p-6 text-sm leading-loose shadow-2xl relative",
                  msg.sender === 'user' 
                    ? "bg-white text-black rounded-[2rem] rounded-tr-none font-bold" 
                    : "bg-neutral-800 text-white rounded-[2rem] rounded-tl-none font-medium border border-white/5"
                )}>
                  {msg.text}
                  {msg.code && (
                    <div className="mt-4 p-3 bg-black/20 rounded-xl font-mono text-[10px] opacity-70 truncate italic">
                      [Binary snapshot attached]
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isEvaluating && (
              <div className="flex items-center gap-3 text-neutral-500 italic text-[10px] font-bold uppercase tracking-widest ml-4">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Interviewer is analyzing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!isComplete && (
            <div className="p-8 bg-black/40 border-t border-white/5">
              <div className="relative group">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Draft your technical explanation..."
                  className="w-full bg-neutral-800/50 text-white px-8 py-5 rounded-[2rem] border border-white/5 outline-none focus:border-emerald-500/50 transition-all font-medium text-sm min-h-[100px] resize-none"
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={!userInput.trim() || isEvaluating}
                  className="absolute bottom-4 right-4 bg-white text-black p-4 rounded-2xl shadow-2xl hover:scale-105 disabled:opacity-20 disabled:scale-100 transition-all"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Code Sandbox */}
        <div className="flex-1 flex flex-col relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="h-14 border-b border-white/5 bg-black/40 flex items-center justify-between px-8 shrink-0">
             <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/30" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
                </div>
                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                  sandbox-v1.ts
                </span>
             </div>
             {phase === 'practical' && (
               <button 
                 onClick={() => handleSubmit(true)}
                 disabled={isEvaluating}
                 className="bg-emerald-500 text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
               >
                 Submit Final Solution
               </button>
             )}
          </div>

          <div className="flex-1 overflow-hidden p-8">
            <div className="h-full bg-black/60 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <Terminal className="w-32 h-32 text-white" />
              </div>
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
                padding={40}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 14,
                  minHeight: "100%",
                  color: '#fff',
                  lineHeight: '1.8'
                }}
                className="w-full h-full outline-none"
              />
            </div>
          </div>

          {/* Report Overlay */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-8"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="max-w-2xl w-full bg-white text-black rounded-[4rem] p-16 text-center space-y-10 shadow-[0_0_100px_rgba(16,185,129,0.1)]"
                >
                  <div className="relative inline-block">
                    <Award className="w-24 h-24 text-black mx-auto relative z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-emerald-500/20 blur-2xl" />
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="text-5xl font-black font-display tracking-tighter leading-none italic uppercase">
                      Evaluation Finalized
                    </h5>
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Engineering Level</span>
                      <div className="h-px w-12 bg-neutral-100" />
                      <span className={cn(
                        "text-2xl font-black font-display",
                        totalScore >= 70 ? "text-emerald-500" : "text-red-500"
                      )}>
                        {totalScore >= 70 ? 'OFFER EXTENDED' : 'FURTHER TRAINING REQUIRED'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="p-8 bg-neutral-50 rounded-[2.5rem]">
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Final Score</p>
                      <p className="text-5xl font-black font-display">{totalScore}<span className="text-xl opacity-20">/100</span></p>
                    </div>
                    <div className="p-8 bg-neutral-900 text-white rounded-[2.5rem]">
                      <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-4">Precision Index</p>
                      <p className="text-5xl font-black font-display">{Math.min(99, totalScore + 12)}<span className="text-xl opacity-20">%</span></p>
                    </div>
                  </div>

                  <p className="text-neutral-500 text-sm leading-loose max-w-lg mx-auto font-medium">
                    "{feedbackHistory[feedbackHistory.length - 1] || 'Session terminated. Data logged to mainframe.'}"
                  </p>

                  <button
                    onClick={onBack}
                    className="w-full bg-black text-white py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all active:scale-95 shadow-2xl"
                  >
                    Return to Lab Perimeter
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
function TaskVisualization({ type, activeStep, totalSteps }: { type?: string, activeStep: number, totalSteps: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (type === 'system') {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#10b981_0%,_transparent_1%)] bg-[length:40px_40px]" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center gap-12">
          <div className="flex items-center gap-16">
            <motion.div 
               animate={{ 
                 borderColor: activeStep >= 0 ? "#10b981" : "#262626",
                 boxShadow: activeStep >= 0 ? "0 0 30px rgba(16,185,129,0.15)" : "none"
               }}
               className="w-24 h-24 rounded-[2.5rem] border-2 border-neutral-800 bg-black flex items-center justify-center relative group"
            >
              <div className="absolute -top-3 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[6px] font-black text-neutral-500 uppercase tracking-widest transition-colors group-hover:text-emerald-500">Node_Alpha</div>
              <Cpu className={cn("w-10 h-10 transition-colors duration-500", activeStep >= 0 ? "text-emerald-500" : "text-neutral-800")} />
            </motion.div>

            <div className="w-24 flex flex-col gap-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-1 w-full bg-neutral-900 rounded-full relative overflow-hidden">
                  <motion.div 
                    animate={{ 
                      x: ["-100%", "100%"],
                      opacity: activeStep >= 1 ? 1 : 0
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.4,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-full"
                  />
                </div>
              ))}
            </div>

            <motion.div 
               animate={{ 
                 borderColor: activeStep >= 1 ? "#10b981" : "#262626",
                 scale: activeStep >= 1 ? 1.05 : 1
               }}
               className="w-32 h-32 rounded-full border-2 border-dashed border-neutral-800 bg-black flex items-center justify-center relative"
            >
               <div className="absolute -top-3 px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[6px] font-black text-neutral-500 uppercase tracking-widest">Gateway_Primary</div>
               <Server className={cn("w-12 h-12 transition-colors duration-500", activeStep >= 1 ? "text-emerald-500" : "text-neutral-800")} />
               {activeStep >= 1 && (
                 <motion.div 
                   animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute inset-0 rounded-full border-2 border-emerald-500"
                 />
               )}
            </motion.div>
          </div>
          
          <div className="flex gap-4">
             {Array.from({ length: totalSteps }).map((_, i) => (
               <div key={i} className="flex flex-col items-center gap-2">
                 <motion.div 
                    animate={{ 
                      height: i <= activeStep ? 16 : 8,
                      backgroundColor: i <= activeStep ? "#10b981" : "#262626"
                    }}
                    className="w-1 rounded-full"
                 />
                 <span className={cn("text-[6px] font-black uppercase tracking-tighter", i <= activeStep ? "text-emerald-500" : "text-neutral-700")}>S_{i+1}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'memory') {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-neutral-950">
        <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                backgroundColor: i < (activeStep + 1) * 4 ? "#10b981" : "#171717",
                borderColor: i < (activeStep + 1) * 4 ? "#34d399" : "#262626",
                boxShadow: i < (activeStep + 1) * 4 ? "0 0 15px rgba(16,185,129,0.2)" : "none"
              }}
              className="aspect-square border-2 rounded-xl flex items-center justify-center relative overflow-hidden"
            >
              <div className="text-[8px] font-black font-mono text-white/10 absolute top-1 left-1">0x{i.toString(16).toUpperCase()}</div>
              {i < (activeStep + 1) * 4 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'logic') {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
        <div className="flex items-center gap-8 relative z-10">
          <motion.div 
            animate={{ borderColor: activeStep >= 0 ? "#10b981" : "#262626" }}
            className="w-20 h-20 border-2 border-neutral-800 rounded-[2rem] flex items-center justify-center bg-black"
          >
            <Binary className={cn("w-8 h-8", activeStep >= 0 ? "text-emerald-500" : "text-neutral-800")} />
          </motion.div>
          
          <div className="w-24 h-0.5 bg-neutral-800 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: activeStep >= 1 ? "100%" : "0%" }}
              className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            />
          </div>

          <motion.div 
            animate={{ 
              borderColor: activeStep >= 1 ? "#10b981" : "#262626",
              scale: activeStep >= 1 ? [1, 1.05, 1] : 1
            }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 border-2 border-dashed border-neutral-800 rounded-full flex items-center justify-center bg-black"
          >
            {activeStep >= 1 ? <ShieldCheck className="w-10 h-10 text-emerald-500" /> : <div className="text-[10px] font-black text-neutral-800 uppercase tracking-widest">Gate 01</div>}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center p-8 bg-neutral-950 overflow-hidden group">
      <div className="relative w-full max-w-sm aspect-video border rounded-[3rem] border-white/5 bg-black/40 p-8 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-6 w-full">
           <div className="space-y-4">
              <div className="h-2 w-12 bg-emerald-500/20 rounded-full" />
              <div className="h-12 w-full border border-white/5 bg-white/5 rounded-2xl flex items-center justify-center">
                <Cpu className="w-5 h-5 text-neutral-600" />
              </div>
           </div>
           <div className="flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                   animate={{ 
                    rotate: 360,
                    borderColor: activeStep >= 0 ? ["#10b981", "#34d399"] : ["#171717", "#171717"]
                   }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="w-24 h-24 border-2 border-neutral-800 rounded-full border-t-emerald-500 opacity-20"
                />
              </div>
              <Database className={cn("w-8 h-8 transition-colors duration-500", activeStep >= 1 ? "text-emerald-500" : "text-neutral-800")} />
           </div>
           <div className="space-y-4">
              <div className="h-2 w-12 bg-emerald-500/20 rounded-full ml-auto" />
              <div className="h-12 w-full border border-white/5 bg-white/5 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-neutral-600" />
              </div>
           </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={cn("w-8 h-1 rounded-full transition-all duration-500", i <= activeStep ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-neutral-800")} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskView({
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
  const [activeTab, setActiveTab] = useState<
    "inbox" | "basics" | "instructions" | "visual"
  >("inbox");
  const [activeStep, setActiveStep] = useState(0);
  const [openTips, setOpenTips] = useState<number[]>([]);
  const [showFullReview, setShowFullReview] = useState(false);

  const handleRun = async () => {
    setEvaluating(true);
    setResult(null);
    setShowFullReview(false);

    try {
      const strategy = EvaluationFactory.getStrategyForTask(task.id);
      const engine = new EvaluationEngine(strategy);
      const staticResult = await engine.runEvaluation(code);

      // Backend AI Evaluation
      const aiResponse = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          initialCode: task.initialCode,
          taskTitle: task.title,
          taskDescription: task.description,
          coreObjectives: task.objectives ? task.objectives.join(", ") : task.instructions.map((i) => i.title).join(", "),
        }),
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
          : `${staticResult.message}\n\n${data.review}`,
      };

      // Calculate XP with tip penalty
      // Base penalty: -10 XP per tip opened
      const tipPenalty = openTips.length * 10;
      let xpScore = Math.max(50, data.score - tipPenalty); 

      if (isCompleted) {
        xpScore = 0;
      } else if (!finalResult.success) {
        xpScore = 0;
      }

      const finalResultWithScore = { ...finalResult, score: xpScore };

      setTimeout(() => {
        setResult(finalResultWithScore);
        setEvaluating(false);
      }, 2000);
    } catch (e: any) {
      console.error("Evaluation Error:", e);
      setResult({
        success: false,
        review: `Review Engine Error: ${e.message || "Evaluation failed."}`,
        score: 0,
      });
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
                      : "bg-neutral-100 text-black border-neutral-200 ",
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
                className="flex items-center gap-3 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl"
              >
                <div className="flex items-center gap-2 pr-3 border-r border-neutral-200">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      result.success ? "bg-emerald-500" : "bg-red-500",
                    )}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    {result.success ? "Passed" : "Failed"}
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-1 pr-3">
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-bold text-black font-display">
                    {result.score}/100
                  </span>
                </div>
                <button
                  onClick={() => setShowFullReview(true)}
                  className="px-3 py-1 bg-black text-white text-[10px] font-bold rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  View Details
                </button>
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
              { id: "instructions", icon: ClipboardList, label: "Lab" },
              { id: "visual", icon: Activity, label: "System" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 py-4 flex items-center justify-center gap-2 lg:gap-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-neutral-700 "
                    : "text-neutral-400 hover:text-neutral-700 ",
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
                  <div className="bg-neutral-50 border border-neutral-200 rounded-[2rem] p-6 lg:p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Mail className="w-24 h-24" />
                    </div>
                    <div className="flex items-center justify-between pb-6 border-b border-neutral-200 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 overflow-hidden shrink-0 shadow-sm">
                          <img
                            src={task.sender?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${task.sender?.name}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-black text-black font-display uppercase tracking-tight">
                            {task.sender?.name}
                          </p>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            {task.sender?.role}
                          </p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1">Authorization</p>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Lvl 4 Required</p>
                      </div>
                    </div>
                    <div className="space-y-6 relative z-10">
                      <div className="flex items-center gap-3">
                         <div className="px-2 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest rounded-md">Subject</div>
                         <h4 className="text-lg font-black text-black leading-tight tracking-tight uppercase italic">
                           {task.subject || "Mission Briefing"}
                         </h4>
                      </div>
                      <div className="text-neutral-600 text-sm leading-relaxed space-y-6 font-medium">
                        <p className="italic text-neutral-400 border-l-2 border-neutral-200 pl-4">"Operational readiness is paramount. Your contribution to the subsystem is expected immediately."</p>
                        <p className="leading-loose">{task.description}</p>
                        
                        <div className="mt-8 pt-8 border-t border-neutral-200/50">
                          <div className="flex items-center justify-between mb-6">
                            <p className="font-black text-black text-xs uppercase tracking-widest flex items-center gap-2">
                               <Target className="w-4 h-4 text-emerald-500" /> Technical Objectives
                            </p>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{task.instructions.length} Sub-routines</span>
                          </div>
                          <ul className="grid grid-cols-1 gap-3">
                            {task.instructions.map((step, idx) => (
                              <li key={idx} className="flex items-center gap-4 p-4 bg-white border border-neutral-100 rounded-2xl shadow-sm text-xs group hover:border-black transition-all">
                                <span className="w-6 h-6 flex items-center justify-center bg-neutral-50 border border-neutral-200 rounded-lg text-[10px] font-black text-black group-hover:bg-black group-hover:text-white transition-colors">{idx + 1}</span>
                                <span className="font-bold text-neutral-900">{step.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === "visual" && (
                <motion.div
                  key="visual"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full flex flex-col bg-black rounded-[2rem] overflow-hidden border border-white/10"
                >
                  <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                        System Feed: {task.visualType || 'General'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-h-[400px]">
                    <TaskVisualization 
                      type={task.visualType} 
                      activeStep={activeStep} 
                      totalSteps={task.instructions.length}
                    />
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
                  <div className="space-y-6 pb-12">
                    <div className="flex items-center gap-3 mb-8">
                       <BookOpen className="w-6 h-6 text-emerald-500" />
                       <h4 className="text-xs font-black text-black uppercase tracking-[0.3em]">
                          Knowledge Repository
                       </h4>
                    </div>
                    <p className="text-neutral-400 text-xs mb-8 leading-relaxed font-bold uppercase tracking-widest">
                      Decipher the theoretical foundations before engaging the operational stack.
                    </p>
                    <div className="grid grid-cols-1 gap-6">
                      {task.basics?.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-neutral-100 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-xl hover:border-black transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-black text-black uppercase tracking-tight font-display pr-4 group-hover:italic transition-all">
                              {item.title}
                            </h5>
                            <span className="text-[10px] font-bold text-neutral-200 uppercase tracking-widest">Module 0{idx + 1}</span>
                          </div>
                          <div className="h-px w-full bg-neutral-50" />
                          <p className="text-xs text-neutral-500 leading-loose font-medium">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === "instructions" && (
                <motion.div
                  key="instructions"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-8 pb-12"
                >
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Layers className="w-6 h-6 text-emerald-500" />
                         <h4 className="text-xs font-black text-black uppercase tracking-[0.3em]">
                           Operational Lab
                         </h4>
                      </div>
                      <span className="text-[10px] font-black text-neutral-400 bg-neutral-50 px-3 py-1 rounded-full border border-neutral-100">
                        {activeStep + 1} / {task.instructions.length} SECTIONS
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {task.instructions.map((step, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={cn(
                            "w-full text-left p-6 rounded-[2rem] border transition-all group relative overflow-hidden",
                            activeStep === idx
                              ? "bg-black border-black text-white shadow-2xl scale-[1.02] z-10"
                              : "bg-white border-neutral-100 text-neutral-500 hover:border-black hover:scale-[1.01]",
                          )}
                        >
                          <div className="flex items-center gap-6 relative z-10 w-full pr-4">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all shrink-0",
                                activeStep === idx
                                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                                  : "bg-neutral-50 text-neutral-300 group-hover:bg-black group-hover:text-white",
                              )}
                            >
                              {idx + 1}
                            </div>
                            <span className="font-black text-xs uppercase tracking-widest block">
                              {step.title}
                            </span>
                          </div>
                          <AnimatePresence>
                            {activeStep === idx && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 text-neutral-300 leading-loose pl-16 text-xs font-medium border-t border-white/10 pt-6"
                              >
                                {step.content}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      ))}
                    </div>
                  </div>

                  {(task.tips || []).length > 0 && (
                    <div className="mt-12 pt-12 border-t border-neutral-100">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                           <Lightbulb className="w-6 h-6 text-yellow-500" />
                           <h4 className="text-xs font-black text-black uppercase tracking-[0.3em]">
                             Subsystem Tips
                           </h4>
                        </div>
                        <div className="flex items-center gap-2 text-[8px] text-white font-black bg-orange-500 px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/20 uppercase tracking-widest">
                          <Zap className="w-3 h-3" />
                          Penalty: 10 XP
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {(task.tips || []).map((tip, idx) => {
                          const isOpen = openTips.includes(idx);
                          return (
                            <div
                              key={idx}
                              className={cn(
                                "rounded-[2rem] border transition-all duration-500 overflow-hidden",
                                isOpen
                                  ? "border-yellow-200 bg-yellow-50/50"
                                  : "border-neutral-100 bg-white hover:border-black",
                              )}
                            >
                              <button
                                onClick={() =>
                                  setOpenTips((prev) =>
                                    prev.includes(idx)
                                      ? prev.filter((i) => i !== idx)
                                      : [...prev, idx],
                                  )
                                }
                                className="w-full p-6 flex justify-between items-center group/tip"
                              >
                                <span
                                  className={cn(
                                    "text-[10px] font-black uppercase tracking-widest text-left pr-4 transition-colors",
                                    isOpen ? "text-yellow-700" : "text-neutral-500 group-hover/tip:text-black",
                                  )}
                                >
                                  {tip.title}
                                  {!isOpen && <span className="ml-2 text-neutral-300 font-normal italic lowercase">(unlock)</span>}
                                </span>
                                <ChevronRight
                                  className={cn(
                                    "w-5 h-5 shrink-0 transition-transform duration-500",
                                    isOpen ? "rotate-90 text-yellow-600" : "text-neutral-300",
                                  )}
                                />
                              </button>
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-8 pb-8 text-xs text-yellow-800 leading-loose font-medium italic"
                                  >
                                    {tip.content}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="col-span-1 md:col-span-8 flex flex-col gap-8 min-h-0">
          <div className="flex-1 bg-white border border-neutral-200 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl min-h-0 relative">
            <div className="bg-neutral-50 px-8 py-4 border-b border-neutral-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-neutral-200 border border-neutral-300" />
                  <div className="w-3 h-3 rounded-full bg-neutral-200 border border-neutral-300" />
                  <div className="w-3 h-3 rounded-full bg-neutral-200 border border-neutral-300" />
                </div>
                <div className="flex items-center gap-3 px-4 py-1.5 bg-white rounded-xl border border-neutral-200 ">
                  <Code2 className="w-4 h-4 text-black " />
                  <span className="text-xs font-mono text-neutral-500 ">
                    main.js
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCode(task.initialCode)}
                className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-black transition-all"
                title="Reset Code"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 relative min-h-0 overflow-y-auto custom-scrollbar bg-white">
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) =>
                  Prism.highlight(
                    code,
                    Prism.languages.javascript,
                    "javascript",
                  )
                }
                padding={40}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 14,
                  minHeight: "100%",
                  backgroundColor: "transparent",
                }}
                className="w-full text-black outline-none leading-relaxed selection:bg-neutral-100 "
              />
            </div>
            <div className="p-8 bg-neutral-50 border-t border-neutral-200 shrink-0">
              <button
                onClick={handleRun}
                disabled={evaluating}
                className="w-full bg-black hover:bg-neutral-800 disabled:bg-neutral-50 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-4 shadow-sm active:scale-[0.98]"
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
        {result && showFullReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="bg-white border border-neutral-200 w-full max-w-5xl max-h-[95vh] rounded-[2rem] sm:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 lg:p-8 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-neutral-50/50 shrink-0">
                <div className="flex items-center gap-5">
                  <div
                    className={cn(
                      "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0",
                      result.success
                        ? "bg-emerald-500 text-white"
                        : "bg-red-500 text-white",
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
                      {result.success
                        ? "Evaluation Passed"
                        : "System Review Failed"}
                    </h2>
                    <p className="text-neutral-500 text-xs sm:text-sm">
                      Detailed Code Analysis by Senior Architect
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-4xl lg:text-5xl font-bold font-display text-black ">
                    {result.score}
                    <span className="text-lg lg:text-xl text-neutral-300 ">
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
              <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar bg-white">
                <div className="max-w-4xl mx-auto space-y-12">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-6 border-b border-neutral-100 pb-3 flex items-center gap-3 font-display">
                      <UserIcon className="w-5 h-5 text-neutral-400" /> Senior
                      Architect's Feedback
                    </h3>
                    <div className="whitespace-pre-wrap text-neutral-600 text-sm sm:text-[15px] leading-relaxed bg-neutral-50 p-6 lg:p-8 rounded-3xl border border-neutral-200 shadow-sm">
                      {result.review}
                    </div>
                  </div>
                  {result.optimizationTips &&
                    result.optimizationTips.length > 0 && (
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-6 border-b border-neutral-100 pb-3 flex items-center gap-3 font-display">
                          <Zap className="w-5 h-5 text-yellow-500" />{" "}
                          Optimization Suggestions
                        </h3>
                        <ul className="space-y-4">
                          {result.optimizationTips.map(
                            (tip: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex gap-4 items-start text-neutral-600 bg-neutral-50 p-4 lg:p-6 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-all"
                              >
                                <span className="w-6 h-6 rounded-full bg-white text-black border border-neutral-200 flex items-center justify-center text-xs shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="leading-relaxed text-sm sm:text-[15px]">
                                  {tip}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
              <div className="p-6 lg:p-8 border-t border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row justify-end gap-3 lg:gap-4 shrink-0">
                <button
                  onClick={() => setShowFullReview(false)}
                  className="px-6 py-4 rounded-xl font-medium text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors w-full sm:w-auto text-center"
                >
                  {result.success ? "Close Review" : "Close & Fix Code"}
                </button>
                {result.success && !isCompleted && (
                  <button
                    onClick={() => onComplete(result.score)}
                    className="px-8 lg:px-10 py-4 rounded-xl font-bold text-white bg-black hover:bg-neutral-800 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
                  >
                    Complete Task <ArrowRight className="w-5 h-5" />
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

function AdminView() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await userService.getAllProfiles();
      setUsers(allUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleUpdateRole = async (uid: string, newRole: string) => {
    try {
      await userService.updateProfile(uid, { role: newRole as any });
      setUsers(users.map(u => u.uid === uid ? { ...u, role: newRole as any } : u));
    } catch (e) {
      alert("Failed to update role: " + e);
    }
  };

  const handleUpdateScore = async (uid: string, currentScore: number) => {
    const newScore = parseInt(prompt("Enter new score:", currentScore.toString()) || "");
    if (!isNaN(newScore)) {
      try {
        await userService.updateProfile(uid, { totalScore: newScore });
        setUsers(users.map(u => u.uid === uid ? { ...u, totalScore: newScore } : u));
      } catch (e) {
        alert("Failed to update score: " + e);
      }
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (confirm("Are you sure you want to delete this user? This action is irreversible.")) {
      try {
        await userService.deleteUser(uid);
        setUsers(users.filter((u) => u.uid !== uid));
      } catch (e) {
        alert("Failed to delete user: " + e);
      }
    }
  };

  const handleResetProgress = async (uid: string) => {
    if (confirm("Are you sure you want to reset this user's progress? This action is irreversible.")) {
      try {
        await userService.updateProfile(uid, { completedTasks: [] });
        setUsers(users.map(u => u.uid === uid ? { ...u, completedTasks: [] } : u));
      } catch (e) {
        alert("Failed to reset progress: " + e);
      }
    }
  };

  if (loading) return <div className="p-20 text-center uppercase font-black text-neutral-300 tracking-widest">Scanning Network...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-20"
    >
      <div className="relative p-12 rounded-[2.5rem] bg-red-50 border border-red-100 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-black font-display text-red-600 tracking-tighter uppercase italic mb-4">
            System Administration<span className="text-red-200 ml-2">//</span>
          </h1>
          <p className="text-red-400 font-medium max-w-2xl">
            Unauthorized access to these systems is strictly prohibited. You are operating with 
            ROOT privileges. Every action is logged.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Shield className="w-32 h-32 text-red-600" />
        </div>
      </div>

      <div className="bg-white border border-neutral-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-neutral-50 bg-neutral-50/50 flex items-center justify-between">
          <h3 className="font-black text-black tracking-tight text-xl uppercase">Node Registry</h3>
          <span className="text-[10px] font-bold text-neutral-400">{users.length} ACTIVE CONNECTIONS</span>
        </div>
        <div className="divide-y divide-neutral-50">
          {users.map((u) => (
            <div key={u.uid} className="p-8 flex items-center justify-between hover:bg-neutral-50 transition-colors group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl border-2 border-neutral-100 overflow-hidden bg-white">
                   <img src={u.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.uid}`} alt="" />
                </div>
                <div>
                  <h4 className="font-black text-lg text-black tracking-tight">{u.displayName}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{u.email}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-200" />
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{u.role}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="text-right">
                    <p className="text-xl font-black text-black tracking-tight">{u.totalScore}</p>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">XP LOAD</p>
                 </div>
                 <button 
                  onClick={() => handleUpdateScore(u.uid, u.totalScore)}
                  className="p-4 bg-white border border-neutral-100 rounded-2xl text-emerald-500 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
                 >
                    <RefreshCw className="w-5 h-5" />
                 </button>
                 <button 
                  onClick={() => handleResetProgress(u.uid)}
                  className="p-4 bg-white border border-neutral-100 rounded-2xl text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-sm"
                 >
                    <RotateCcw className="w-5 h-5" />
                 </button>
                 <button 
                  onClick={() => handleDeleteUser(u.uid)}
                  className="p-4 bg-white border border-neutral-100 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                 >
                    <Trash2 className="w-5 h-5" />
                 </button>
                 <button 
                  onClick={() => handleUpdateRole(u.uid, u.role === 'admin' ? 'student' : 'admin')}
                  className={cn(
                    "p-4 border rounded-2xl transition-all shadow-sm",
                    u.role === 'admin' 
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-white"
                      : "bg-white border-neutral-100 text-neutral-400 hover:bg-black hover:text-white"
                  )}
                 >
                    <Shield className="w-5 h-5" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function RankingView() {
  const [leaders, setLeaders] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    userService
      .getLeaderboard(20)
      .then((data) => {
        setLeaders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-12 pb-20"
    >
      {" "}
      <div className="relative overflow-hidden rounded-[2.5rem] p-10 sm:p-14 border border-white/10 bg-[#0d1017] shadow-2xl">
        {" "}
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-10">
          {" "}
          <div className="flex items-center gap-8">
            {" "}
            <div className="p-5 bg-white/5 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-xl">
              {" "}
              <Target className="w-12 h-12 text-white/90 " />{" "}
            </div>{" "}
            <div className="text-center sm:text-left">
              {" "}
              <h1 className="text-4xl sm:text-5xl font-black font-display text-white mb-3 tracking-tighter uppercase italic">
                {" "}
                Global Ranking<span className="text-white/20 ml-2">//</span>
              </h1>{" "}
              <p className="text-white/40 text-lg sm:text-xl font-medium">
                {" "}
                Measuring the collective intelligence of the ecosystem.
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 blur-[120px] rounded-full" />
      </div>{" "}
      <div className="glass-panel bg-white/50 rounded-3xl overflow-hidden border border-neutral-200 p-6 md:p-8">
        {" "}
        <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-[0.2em] mb-8 font-display">
          {" "}
          Top 20 Engineers
        </h2>{" "}
        {loading ? (
          <div className="flex justify-center p-12">
            {" "}
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />{" "}
          </div>
        ) : (
          <div className="space-y-4">
            {" "}
            {leaders.map((leader, index) => (
              <div
                key={leader.uid}
                className={cn(
                  "p-6 rounded-[2rem] flex items-center justify-between border transition-all hover:scale-[1.01] group",
                  index === 0
                    ? "bg-black text-white border-black shadow-2xl"
                    : index === 1
                      ? "bg-neutral-50 border-neutral-100 shadow-sm"
                      : index === 2
                        ? "bg-neutral-50 border-neutral-100 shadow-sm"
                        : "bg-white border-neutral-100 ",
                )}
              >
                {" "}
                <div className="flex items-center gap-6">
                  {" "}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg",
                      index === 0
                        ? "bg-white text-black"
                        : index === 1
                          ? "bg-neutral-200 text-black"
                          : index === 2
                            ? "bg-neutral-100 text-black "
                            : "bg-neutral-50 text-neutral-400 ",
                    )}
                  >
                    {" "}
                    {index + 1}{" "}
                  </div>{" "}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-neutral-200 overflow-hidden border border-neutral-100">
                      <img src={leader.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.uid}`} alt="" />
                    </div>
                    <div>
                      {" "}
                      <h4
                        className={cn(
                          "font-black text-xl tracking-tight leading-none mb-1",
                          index === 0 ? "text-white" : "text-black ",
                        )}
                      >
                        {" "}
                        {leader.displayName}{" "}
                      </h4>{" "}
                      <p className={cn(
                        "text-[10px] font-bold uppercase tracking-widest",
                        index === 0 ? "text-white/40" : "text-neutral-400"
                      )}>
                        {" "}
                        CORE SYSTEM ENGINEER // {leader.completedTasks.length} NODES
                      </p>{" "}
                    </div>{" "}
                  </div>
                </div>{" "}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={cn(
                      "text-2xl font-black font-display tracking-tight leading-none mb-1",
                      index === 0 ? "text-white" : "text-black"
                    )}>{leader.totalScore}</p>
                    <p className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      index === 0 ? "text-white/40" : "text-neutral-400"
                    )}>XP CAPACITY</p>
                  </div>
                  <div className={cn(
                    "w-1 h-12 rounded-full",
                    index === 0 ? "bg-white/20" : "bg-neutral-100"
                  )} />
                </div>{" "}
              </div>
            ))}{" "}
            {leaders.length === 0 && (
              <div className="text-center p-12 text-neutral-400 ">
                {" "}
                No engineers rated yet.
              </div>
            )}{" "}
          </div>
        )}{" "}
      </div>{" "}
    </motion.div>
  );
}
function ProfileView({ profile }: { profile: UserProfile | null }) {
  const seeds = ["Felix", "Aneka", "Jasper", "Missy", "Nala", "Simba", "Boots", "Lola", "Cleo", "Shadow", "Oliver", "Max"];
  const [updating, setUpdating] = useState(false);

  const updateAvatar = async (seed: string) => {
    if (!profile) return;
    setUpdating(true);
    try {
      const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
      await userService.updateProfile(profile.uid, { photoURL: url });
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-12 pb-20 max-w-4xl mx-auto"
    >
      <div className="relative p-12 md:p-16 rounded-[3rem] bg-white border border-neutral-100 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 blueprint-grid opacity-5" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="relative group">
            <div className={cn(
              "w-48 h-48 rounded-[3.5rem] border-4 border-black p-2 bg-neutral-50 shadow-2xl transition-all duration-500",
              updating ? "animate-pulse opacity-50" : "group-hover:rotate-3 group-hover:scale-105"
            )}>
              <img
                src={profile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${auth.currentUser?.uid}`}
                alt={profile?.displayName || "User"}
                className="w-full h-full object-cover rounded-[3rem]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-500 rounded-3xl border-4 border-white flex items-center justify-center shadow-2xl">
              <Award className="w-8 h-8 text-black" />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">Account Authenticated</p>
            <h3 className="text-5xl font-black text-black font-display tracking-tight uppercase italic mb-2">
              {profile?.displayName}
            </h3>
            <p className="text-neutral-400 font-bold text-sm tracking-widest uppercase mb-8">
              System Authorization: <span className="text-black">{profile?.role === 'admin' ? 'UNRESTRICTED' : `LEVEL ${Math.floor((profile?.totalScore || 0) / 500) + 1}`}</span>
            </p>
            <div className="bg-neutral-50 border border-neutral-100 p-6 rounded-3xl mb-8">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Info className="w-3 h-3" /> Level System Logic
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Your <span className="font-bold text-black italic">V-LEVL</span> (Virtual Level) indicates your verified operational proficiency. 
                Earn <span className="font-bold text-black">500 XP</span> to advance to the next authorization tier.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {["ARCHITECT", "DEVOPS", "SECURITY", "LEAD"].map((tag) => (
                <span key={tag} className="px-5 py-2 bg-neutral-100 text-[10px] font-black text-neutral-400 rounded-xl border border-neutral-200 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between px-6">
          <h4 className="text-xs font-black text-neutral-400 uppercase tracking-[0.3em]">System Identity Customization</h4>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Select Visual Seed</span>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
          {seeds.map((seed) => {
            const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
            const isActive = profile?.photoURL === url;
            return (
              <button
                key={seed}
                disabled={updating}
                onClick={() => updateAvatar(seed)}
                className={cn(
                  "aspect-square rounded-2xl border-2 transition-all p-1 bg-white relative group overflow-hidden",
                  isActive 
                    ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-emerald-50" 
                    : "border-neutral-100 hover:border-black hover:scale-110 shadow-sm"
                )}
              >
                <img src={url} alt={seed} className="w-full h-full object-contain pointer-events-none" />
                {isActive && (
                   <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                     <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                   </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCardOutline
          icon={<Zap className="w-5 h-5 group-hover:text-white transition-colors" />}
          label="Cumulative Load"
          value={profile?.totalScore || 0}
          subtext="xp points"
        />
        <StatCardOutline
          icon={<CheckCircle2 className="w-5 h-5 group-hover:text-white transition-colors" />}
          label="Processors Active"
          value={profile?.completedTasks.length || 0}
          subtext="nodes closed"
        />
        <StatCardOutline
          icon={<Layers className="w-5 h-5 group-hover:text-white transition-colors" />}
          label="Subsystems"
          value="1"
          subtext="active track"
        />
      </div>

      <div className="pt-12 border-t border-neutral-100 flex justify-center">
        <button
          onClick={logout}
          className="px-12 py-5 rounded-[2rem] bg-white border border-red-100 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all shadow-xl hover:shadow-red-500/20 active:scale-95"
        >
          Terminate Operational Session
        </button>
      </div>
    </motion.div>
  );
}
