import { 
  doc, 
  updateDoc, 
  arrayUnion, 
  increment, 
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  where,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, Task } from '../types';

export const userService = {
  async getProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, 'users', uid);
    const snap = await getDoc(docRef);
    return snap.exists() ? (snap.data() as UserProfile) : null;
  },

  async getLeaderboard(limitCount: number = 10): Promise<UserProfile[]> {
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(leaderboardRef, orderBy('totalScore', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as UserProfile);
  },

  async setTrack(uid: string, trackId: string) {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      currentTrackId: trackId
    });
  },

  async updateProgress(uid: string, taskId: string, score: number) {
    const docRef = doc(db, 'users', uid);
    const leadRef = doc(db, 'leaderboard', uid);
    
    // Get existing profile to update leaderboard safely
    const snap = await getDoc(docRef);
    if(snap.exists()) {
      const data = snap.data() as UserProfile;
      const newTasks = [...data.completedTasks];
      if(!newTasks.includes(taskId)) newTasks.push(taskId);
      
      await setDoc(leadRef, {
        uid,
        displayName: data.displayName,
        totalScore: data.totalScore + score,
        completedTasks: newTasks
      }, { merge: true });
    }

    await updateDoc(docRef, {
      completedTasks: arrayUnion(taskId),
      totalScore: increment(score)
    });
  },

  subscribeToProfile(uid: string, callback: (profile: UserProfile) => void) {
    return onSnapshot(doc(db, 'users', uid), (doc) => {
      if (doc.exists()) {
        callback(doc.data() as UserProfile);
      }
    });
  }
};

export const taskService = {
  // In a real product, these would come from Firestore
  // For now, we'll use our expanded INITIAL_TASKS but provide a way to fetch them
  getTasksByTrack(trackId: string, allTasks: Task[]) {
    return allTasks.filter(t => t.trackId === trackId);
  }
};
