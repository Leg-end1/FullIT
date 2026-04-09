import { 
  doc, 
  updateDoc, 
  arrayUnion, 
  increment, 
  getDoc,
  setDoc,
  collection,
  query,
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

  async updateProgress(uid: string, taskId: string, score: number) {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      completedTasks: arrayUnion(taskId),
      totalScore: increment(score)
    });
  },

  async setTrack(uid: string, trackId: string) {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      currentTrackId: trackId
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
