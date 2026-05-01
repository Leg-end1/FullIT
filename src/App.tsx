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
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { cn } from "./lib/utils";
import { UserProfile, Task, Track, TaskStep } from "./types";
import { ALL_TASKS, TRACKS } from "./constants";
import { userService, taskService } from "./services/dataService";
import { TaskProviderFactory } from "./lib/TaskFactory";
import { VisualizerAdapter } from "./lib/VisualizerAdapter";
import { EvaluationFactory, EvaluationEngine } from "./lib/EvaluationStrategy";
import { GoogleGenAI } from "@google/genai";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "tracks" | "profile" | "exams" | "ranking"
  >("dashboard");
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
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
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || "Engineer",
              email: currentUser.email || "",
              completedTasks: [],
              totalScore: 0,
              role: "student",
              currentTrackId: "programming-foundations",
              createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, "users", currentUser.uid), newProfile);
            await setDoc(doc(db, "leaderboard", currentUser.uid), {
              uid: currentUser.uid,
              displayName: newProfile.displayName,
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
              StackMaster<span className="text-black "> .</span>{" "}
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
      <aside className="w-72 h-full border-r border-neutral-200 flex flex-col bg-neutral-50 z-20">
        {" "}
        <div className="flex items-center gap-3 p-6 shrink-0 border-b border-transparent">
          {" "}
          <div className="p-2 bg-neutral-100 rounded-lg border border-neutral-200 ">
            {" "}
            <Terminal className="w-6 h-6 text-black " />{" "}
          </div>{" "}
          <span className="font-bold text-2xl tracking-tight text-black font-display">
            {" "}
            StackMaster
          </span>{" "}
        </div>{" "}
        <nav className="flex-1 overflow-y-auto space-y-2 p-6 pt-2 custom-scrollbar">
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
            label="Learning Tracks"
            active={activeTab === "tracks"}
            onClick={() => {
              setActiveTab("tracks");
              setSelectedTask(null);
              setSelectedTrack(null);
            }}
          />{" "}
          <NavItem
            icon={<Target className="w-5 h-5" />}
            label="Global Ranking"
            active={activeTab === "ranking"}
            onClick={() => {
              setActiveTab("ranking");
              setSelectedTask(null);
              setSelectedTrack(null);
            }}
          />{" "}
          <NavItem
            icon={<Shield className="w-5 h-5" />}
            label="Interview Simulator"
            active={activeTab === "exams"}
            onClick={() => {
              setActiveTab("exams");
              setSelectedTask(null);
              setSelectedTrack(null);
            }}
          />{" "}
          <NavItem
            icon={<UserIcon className="w-5 h-5" />}
            label="Lab Profile"
            active={activeTab === "profile"}
            onClick={() => {
              setActiveTab("profile");
              setSelectedTask(null);
              setSelectedTrack(null);
            }}
          />{" "}
        </nav>{" "}
        <div className="p-6 pt-0 shrink-0 mt-auto">
          {" "}
          {profile?.currentTrackId && (
            <div className="bg-neutral-100 p-4 rounded-2xl border border-neutral-200 mb-4">
              {" "}
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
                {" "}
                Active Track
              </p>{" "}
              <div className="flex items-center gap-3">
                {" "}
                <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200 ">
                  {" "}
                  <Server className="w-5 h-5 text-black " />{" "}
                </div>{" "}
                <div className="flex-1 min-w-0">
                  {" "}
                  <p className="text-sm font-bold text-black truncate">
                    {" "}
                    {TRACKS.find((t) => t.id === profile.currentTrackId)
                      ?.title || "Fundamentals"}{" "}
                  </p>{" "}
                  <div className="w-full bg-neutral-200 h-1 rounded-full mt-2 overflow-hidden">
                    {" "}
                    <div
                      className="bg-black h-full transition-all duration-500"
                      style={{
                        width: `${(profile.completedTasks.length / ALL_TASKS.filter((t) => t.trackId === profile.currentTrackId).length) * 100} %`,
                      }}
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          )}{" "}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-xl transition-all font-medium"
          >
            {" "}
            <LogOut className="w-5 h-5" /> <span> Terminate Session</span>{" "}
          </button>{" "}
        </div>{" "}
      </aside>{" "}
      {}{" "}
      <main className="flex-1 overflow-auto blueprint-grid relative">
        {" "}
        <header className="h-20 border-b border-neutral-200 flex items-center justify-between px-10 bg-white/90 backdrop-blur-md sticky top-0 z-10 transition-colors duration-200">
          {" "}
          <div className="flex items-center gap-4">
            {" "}
            <h2 className="text-xl font-bold text-black font-display uppercase tracking-tight">
              {" "}
              {selectedTask
                ? selectedTask.title
                : selectedTrack
                  ? selectedTrack.title
                  : activeTab}{" "}
            </h2>{" "}
            {selectedTask && (
              <span className="px-2 py-0.5 bg-neutral-100 text-black text-[10px] font-bold uppercase tracking-widest rounded border border-neutral-200 ">
                {" "}
                Task Active{" "}
              </span>
            )}{" "}
          </div>{" "}
          <div className="flex items-center gap-6">
            {" "}
            <div className="flex items-center gap-3 bg-neutral-50 px-4 py-2 rounded-2xl border border-neutral-200 ">
              {" "}
              <Award className="w-5 h-5 text-yellow-600 " />{" "}
              <span className="text-sm font-bold text-black ">
                {" "}
                {profile?.totalScore || 0}{" "}
                <span className="text-neutral-500 font-normal"> XP</span>{" "}
              </span>{" "}
            </div>{" "}
            <div className="h-10 w-px bg-neutral-200/50 " />{" "}
            <img
              src={user.photoURL || ""}
              alt={user.displayName || ""}
              className="w-10 h-10 rounded-2xl border-2 border-black shadow-sm"
              referrerPolicy="no-referrer"
            />{" "}
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
                  if (user) {
                    await userService.setTrack(user.uid, track.id);
                  }
                  setSelectedTrack(track);
                }}
                selectedTrack={selectedTrack}
                onSelectTask={setSelectedTask}
              />
            ) : activeTab === "exams" ? (
              <ExamsView />
            ) : activeTab === "ranking" ? (
              <RankingView />
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
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium relative group",
        active ? "text-neutral-700 " : "text-neutral-400 hover:text-black",
      )}
    >
      {" "}
      {active && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 bg-neutral-50 border border-black rounded-xl"
        />
      )}{" "}
      <div
        className={cn(
          "relative z-10 transition-colors",
          active ? "text-neutral-700 " : "group-hover:text-black",
        )}
      >
        {" "}
        {icon}{" "}
      </div>{" "}
      <span className="relative z-10"> {label} </span>{" "}
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
  const trackTasks = ALL_TASKS.filter((t) => t.trackId === currentTrack.id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 pb-20 max-w-[1100px] mx-auto"
    >
      {" "}
      <div className="flex items-center gap-2 text-neutral-500 text-sm mb-4">
        {" "}
        <Code2 className="w-4 h-4" /> <Database className="w-4 h-4" />{" "}
        <Cloud className="w-4 h-4" /> <span> Full-Stack Engineering</span>{" "}
      </div>{" "}
      <h1 className="text-4xl md:text-5xl font-bold text-black font-display mb-4">
        {" "}
        Welcome to StackMaster
      </h1>{" "}
      <p className="text-neutral-500 text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
        {" "}
        The interactive laboratory for full-stack engineers. Learn by building,
        visualizing, and mastering real systems across the entire stack.{" "}
      </p>{" "}
      <button
        onClick={() => onSelectTrack(currentTrack)}
        className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors shadow-lg active:scale-95"
      >
        {" "}
        Start Learning <ArrowRight className="w-5 h-5" />{" "}
      </button>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-12">
        {" "}
        <StatCardOutline
          icon={<BookOpen className="text-neutral-500 w-5 h-5" />}
          label="Completed Modules"
          value={`${profile?.completedTasks.length || 0} `}
          subtext={`of ${ALL_TASKS.length} total`}
        />{" "}
        <StatCardOutline
          icon={<Award className="text-neutral-500 w-5 h-5" />}
          label="Current Streak"
          value="7"
          subtext="days"
        />{" "}
        <StatCardOutline
          icon={<Clock className="text-neutral-500 w-5 h-5" />}
          label="Time Invested"
          value="48h"
          subtext="this month"
        />{" "}
        <StatCardOutline
          icon={<Target className="text-neutral-500 w-5 h-5" />}
          label="Skills Mastered"
          value="8"
          subtext="core competencies"
        />{" "}
      </div>{" "}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden mt-8">
        {" "}
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center bg-neutral-100">
          {" "}
          <h3 className="font-bold text-black tracking-wide">
            {" "}
            {currentTrack.title}{" "}
          </h3>{" "}
          <span className="text-sm border-b-slate-400 text-neutral-500 ">
            {" "}
            {trackTasks.length} modules
          </span>{" "}
        </div>{" "}
        <div className="divide-y divide-slate-800/80">
          {" "}
          {trackTasks.map((task, idx) => {
            const isCompleted = profile?.completedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                className="p-4 hover:bg-slate-800/30 transition-colors flex items-center justify-between group cursor-pointer"
                onClick={() => onSelectTask(task)}
              >
                {" "}
                <div className="flex items-center gap-4">
                  {" "}
                  <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center shrink-0">
                    {" "}
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 " />
                    ) : (
                      <Play className="w-4 h-4 text-neutral-500 ml-1 group-hover:text-neutral-700 " />
                    )}{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <h5
                      className={cn(
                        "font-bold transition-colors font-display text-lg",
                        isCompleted
                          ? "text-neutral-700 "
                          : "text-black group-hover:text-neutral-700 ",
                      )}
                    >
                      {" "}
                      {idx + 1 + ". " + task.title}{" "}
                    </h5>{" "}
                    <p className="text-neutral-500 text-sm">
                      {" "}
                      {task.description.split(".")[0] + "."}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="text-neutral-400 text-sm whitespace-nowrap hidden sm:block">
                  {" "}
                  45 min{" "}
                </div>{" "}
              </div>
            );
          })}{" "}
        </div>{" "}
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
    <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between hover:border-neutral-300 transition-colors">
      {" "}
      <div className="flex justify-between items-start mb-4">
        {" "}
        <p className="text-sm font-medium text-neutral-500 "> {label} </p>{" "}
        <div> {icon} </div>{" "}
      </div>{" "}
      <div className="flex items-baseline gap-2">
        {" "}
        <p className="text-3xl font-bold text-black font-display">
          {" "}
          {value}{" "}
        </p>{" "}
        <span className="text-xs text-neutral-400 "> {subtext} </span>{" "}
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
    const trackTasks = taskProvider.getTasksByTrack(selectedTrack.id);
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
          key={track.id}
          onClick={() => onSelectTrack(track)}
          className="text-left bg-neutral-100/40 border border-neutral-200 p-10 rounded-[2.5rem] hover:border-black transition-all group relative overflow-hidden"
        >
          {" "}
          <div className="relative z-10 space-y-6">
            {" "}
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center border border-neutral-200 group-hover:scale-110 transition-transform">
              {" "}
              <TrackIcon
                name={track.icon}
                className="w-8 h-8 text-black "
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <h3 className="text-2xl font-bold text-black mb-2 font-display">
                {" "}
                {track.title}{" "}
              </h3>{" "}
              <p className="text-neutral-500 leading-relaxed">
                {" "}
                {track.description}{" "}
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
function ExamsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8 text-center py-20"
    >
      {" "}
      <div className="p-10 bg-neutral-100/40 border border-neutral-200 rounded-[3rem] space-y-6">
        {" "}
        <div className="w-24 h-24 bg-yellow-100 rounded-3xl flex items-center justify-center border border-yellow-200 mx-auto">
          {" "}
          <Shield className="w-12 h-12 text-yellow-600 " />{" "}
        </div>{" "}
        <h3 className="text-4xl font-bold text-black font-display">
          {" "}
          Interview Simulator
        </h3>{" "}
        <p className="text-neutral-500 text-xl max-w-2xl mx-auto">
          {" "}
          Test your skills in high-pressure, timed scenarios. Complete these
          "Exams" to earn exclusive badges and get certified as a StackMaster
          Architect.{" "}
        </p>{" "}
        <div className="pt-8">
          {" "}
          <button className="bg-black text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            {" "}
            Coming Soon: Junior Architect Exam{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
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
    "inbox" | "basics" | "instructions"
  >("inbox");
  const [activeStep, setActiveStep] = useState(0);
  const [openTips, setOpenTips] = useState<number[]>([]);
  const [visualState, setVisualState] = useState<
    "idle" | "running" | "success" | "error"
  >("idle");
  const [showFullReview, setShowFullReview] = useState(false);

  const handleRun = async () => {
    setEvaluating(true);
    setVisualState("running");
    setResult(null);
    setShowFullReview(false);

    try {
      const strategy = EvaluationFactory.getStrategyForTask(task.id);
      const engine = new EvaluationEngine(strategy);
      const staticResult = await engine.runEvaluation(code);

      // Frontend AI Evaluation
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("No Gemini API Key found.");
      }

      const genAI = new GoogleGenAI({ apiKey });
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });
      
      const prompt = `You are a friendly and encouraging Senior Backend Architect mentoring a student.
      Evaluate this code for the task: "${task.title}".
      Task Description: ${task.description}
      Code: \n${code}\n
      
      Provide a review that:
      1. Starts with a positive observation.
      2. Explains any errors or improvements in clear, concise terms.
      3. Suggests 1-2 specific improvements for security or optimization.
      4. Gives a score strictly between 0 and 100.

      Return your response as a JSON object with this structure:
      {
        "success": boolean,
        "review": "markdown string with feedback",
        "score": number,
        "optimizationTips": ["tip 1", "tip 2"]
      }
      Do not include any other text in your response, just the JSON.`;

      const aiResult = await model.generateContent(prompt);
      const outputText = aiResult.response.text();
      const jsonStart = outputText.indexOf("{");
      const jsonEnd = outputText.lastIndexOf("}") + 1;
      const data = JSON.parse(outputText.substring(jsonStart, jsonEnd));

      const finalResult = {
        ...data,
        success: data.success && staticResult.success,
        review: staticResult.success
          ? data.review
          : `${staticResult.message}\n\n${data.review}`,
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
        review: `Review Engine Error: ${e.message || "Evaluation failed."}`,
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
              { id: "instructions", icon: ClipboardList, label: "Lab & Tips" },
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
                  <div className="bg-neutral-50 border border-neutral-200 rounded-[2rem] p-6 lg:p-8 space-y-6">
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
                        
                        <div className="mt-4 pt-4 border-t border-neutral-200/50">
                          <p className="font-bold text-black mb-3 flex items-center gap-2">
                             <Target className="w-4 h-4" /> Core Objectives:
                          </p>
                          <ul className="space-y-3">
                            {task.instructions.map((step, idx) => (
                              <li key={idx} className="flex gap-3 text-xs">
                                <span className="text-black font-bold shrink-0">{idx + 1}.</span>
                                <span className="font-medium text-neutral-600">{step.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="pt-4">
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
                              : "bg-slate-950/50 border-neutral-200 text-neutral-500 hover:border-neutral-300 ",
                          )}
                        >
                          <div className="flex items-center gap-3 lg:gap-4 relative z-10 w-full pr-4">
                            <div
                              className={cn(
                                "w-6 h-6 lg:w-8 lg:h-8 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all shrink-0",
                                activeStep === idx
                                  ? "bg-neutral-100 text-black shadow-sm"
                                  : "bg-neutral-100 text-neutral-400 group-hover:text-neutral-700 ",
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
                              isOpen
                                ? "border-black bg-neutral-50 "
                                : "border-neutral-200 ",
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
                              className="w-full p-4 flex justify-between items-center hover:bg-neutral-100/50 transition-colors"
                            >
                              <span
                                className={cn(
                                  "text-xs font-medium text-left pr-4",
                                  isOpen
                                    ? "text-black font-bold"
                                    : "text-neutral-700 ",
                                )}
                              >
                                {tip.title}
                              </span>
                              <ChevronRight
                                className={cn(
                                  "w-4 h-4 shrink-0 transition-transform duration-300",
                                  isOpen
                                    ? "rotate-90 text-black "
                                    : "text-neutral-400 ",
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
                          : "bg-red-100 border-red-500/30 text-red-600 ",
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
            state === "error"
              ? "error"
              : state === "success"
                ? "success"
                : "idle"
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
                        : "bg-neutral-100 border-neutral-200 text-neutral-400 ",
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
                        : "bg-neutral-100 border-neutral-200 text-neutral-400 ",
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
              className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-black to-transparent shadow-sm"
            />
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
                delay: 0.75,
              }}
              className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-black to-transparent shadow-sm"
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
      "text-purple-400 bg-purple-500/5 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]",
    emerald:
      "text-emerald-400 bg-emerald-500/5 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]",
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
                    ? "0 0 50px rgba(239, 68, 68, 0.3)"
                    : status === "success"
                      ? "0 0 50px rgba(16, 185, 129, 0.3)"
                      : undefined,
              }
            : {}
        }
        transition={{ repeat: Infinity, duration: 3 }}
        className={cn(
          "w-28 h-28 rounded-[2.5rem] border flex items-center justify-center transition-all duration-700 relative",
          active
            ? colors[color]
            : "bg-neutral-100/40 border-neutral-200 text-slate-700",
        )}
      >
        <div
          className={cn(
            "transition-all duration-700",
            active ? "scale-110 glow-text" : "scale-100",
          )}
        >
          {icon}
        </div>
        {status === "error" && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-1 -right-1 bg-red-500 p-2.5 rounded-2xl border-4 border-[#020408] shadow-xl"
          >
            <AlertCircle className="w-4 h-4 text-black " />
          </motion.div>
        )}
        {status === "success" && (
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-1 -right-1 bg-emerald-500 p-2.5 rounded-2xl border-4 border-[#020408] shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4 text-black " />
          </motion.div>
        )}
      </motion.div>
      <span
        className={cn(
          "text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-700 font-display",
          active ? "text-black glow-text" : "text-slate-700",
        )}
      >
        {label}
      </span>
    </div>
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
      <div className="relative overflow-hidden rounded-[2rem] p-8 sm:p-12 border border-neutral-200 bg-[#0d1017]">
        {" "}
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          {" "}
          <div className="flex items-center gap-6">
            {" "}
            <div className="p-4 bg-yellow-100 rounded-2xl border border-yellow-200 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              {" "}
              <Target className="w-10 h-10 text-yellow-600 " />{" "}
            </div>{" "}
            <div>
              {" "}
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-black mb-2">
                {" "}
                Global Ranking
              </h1>{" "}
              <p className="text-neutral-500 ">
                {" "}
                See how you stack up against top engineers worldwide.
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
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
                  "p-5 rounded-2xl flex items-center justify-between border transition-all",
                  index === 0
                    ? "bg-yellow-500/5 border-yellow-200 shadow-[0_0_20px_rgba(234,179,8,0.1)]"
                    : index === 1
                      ? "bg-slate-300/5 border-slate-300/20"
                      : index === 2
                        ? "bg-white border-amber-700/20"
                        : "bg-neutral-100 border-neutral-200 ",
                )}
              >
                {" "}
                <div className="flex items-center gap-4">
                  {" "}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                      index === 0
                        ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                        : index === 1
                          ? "bg-slate-300 text-black"
                          : index === 2
                            ? "bg-white text-black "
                            : "bg-neutral-200 text-neutral-500 ",
                    )}
                  >
                    {" "}
                    #{index + 1}{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <h4
                      className={cn(
                        "font-bold font-display",
                        index === 0 ? "text-yellow-600 " : "text-black ",
                      )}
                    >
                      {" "}
                      {leader.displayName}{" "}
                    </h4>{" "}
                    <p className="text-xs text-neutral-500 ">
                      {" "}
                      {leader.completedTasks.length} tasks completed
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center gap-2">
                  {" "}
                  <span className="font-mono text-xl font-bold bg-white text-transparent text-black ">
                    {" "}
                    {leader.totalScore}{" "}
                  </span>{" "}
                  <span className="text-xs text-neutral-400 font-bold tracking-wider">
                    {" "}
                    XP
                  </span>{" "}
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-16 pb-20"
    >
      {" "}
      <div className="glass-panel bg-white/50 p-12 rounded-[3rem] relative overflow-hidden">
        {" "}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          {" "}
          <div className="relative">
            {" "}
            <div className="w-40 h-40 rounded-[3rem] border-4 border-neutral-200 p-2">
              {" "}
              <img
                src={
                  auth.currentUser?.photoURL ||
                  `https: profile?.displayName} &background=0ea5e9&color=fff`
                }
                alt={profile?.displayName || "User"}
                className="w-full h-full object-cover rounded-[2.5rem]"
                referrerPolicy="no-referrer"
              />{" "}
            </div>{" "}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl border-4 border-[#020408] flex items-center justify-center shadow-xl">
              {" "}
              <Award className="w-6 h-6 text-black " />{" "}
            </div>{" "}
          </div>{" "}
          <div className="text-center md:text-left space-y-4">
            {" "}
            <div className="space-y-1">
              {" "}
              <h3 className="text-4xl font-bold text-black font-display tracking-tight">
                {" "}
                {profile?.displayName}{" "}
              </h3>{" "}
              <p className="text-neutral-700 font-mono text-sm tracking-widest uppercase">
                {" "}
                Senior Systems Engineer
              </p>{" "}
            </div>{" "}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {" "}
              {["React", "Node.js", "TypeScript", "MongoDB"].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1.5 bg-neutral-200/50 text-neutral-500 rounded-full text-xs border border-neutral-300 "
                >
                  {" "}
                  {skill}{" "}
                </span>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-50 blur-[100px] rounded-full" />{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {" "}
        <StatCardOutline
          icon={<Zap className="w-5 h-5 text-black " />}
          label="Total XP"
          value={profile?.totalScore || 0}
          subtext="global ranking"
        />{" "}
        <StatCardOutline
          icon={<CheckCircle2 className="w-5 h-5 text-green-600 " />}
          label="Tasks Completed"
          value={profile?.completedTasks.length || 0}
          subtext="out of total"
        />{" "}
        <StatCardOutline
          icon={<Layers className="w-5 h-5 text-purple-600 " />}
          label="Tracks Active"
          value="1"
          subtext="current focus"
        />{" "}
      </div>{" "}
      <div className="flex justify-center">
        {" "}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-neutral-400 border border-neutral-200 hover:bg-black hover:text-white hover:border-black transition-all font-bold group"
        >
          {" "}
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />{" "}
          Terminate Session{" "}
        </button>{" "}
      </div>{" "}
    </motion.div>
  );
}
