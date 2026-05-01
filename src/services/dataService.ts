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
import { db, auth } from '../firebase';
import { UserProfile, Task } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const userService = {
  async getProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
      return snap.exists() ? (snap.data() as UserProfile) : null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `users/${uid}`);
      return null;
    }
  },

  async getLeaderboard(limitCount: number = 10): Promise<UserProfile[]> {
    try {
      const leaderboardRef = collection(db, 'leaderboard');
      const q = query(leaderboardRef, orderBy('totalScore', 'desc'), limit(limitCount));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as UserProfile);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'leaderboard');
      return [];
    }
  },

  async setTrack(uid: string, trackId: string) {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        currentTrackId: trackId
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${uid}`);
    }
  },

  async updateProgress(uid: string, taskId: string, score: number) {
    const docRef = doc(db, 'users', uid);
    const leadRef = doc(db, 'leaderboard', uid);
    
    try {
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
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${uid}`);
    }
  },

  subscribeToProfile(uid: string, callback: (profile: UserProfile) => void) {
    return onSnapshot(doc(db, 'users', uid), (doc) => {
      if (doc.exists()) {
        callback(doc.data() as UserProfile);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`);
    });
  },

  async getAllProfiles(): Promise<UserProfile[]> {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('totalScore', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(doc => doc.data() as UserProfile);
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'users');
      return [];
    }
  },

  async deleteUser(uid: string) {
    try {
      const { deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'users', uid));
      await deleteDoc(doc(db, 'leaderboard', uid));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `users/${uid}`);
    }
  },

  async updateProfile(uid: string, data: Partial<UserProfile>) {
    try {
      await updateDoc(doc(db, 'users', uid), data);
      if (data.displayName || data.photoURL) {
        const lbData: any = {};
        if (data.displayName) lbData.displayName = data.displayName;
        if (data.photoURL) lbData.photoURL = data.photoURL;
        await updateDoc(doc(db, 'leaderboard', uid), lbData);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${uid}`);
    }
  }
};

export const taskService = {
  // In a real product, these would come from Firestore
  // For now, we'll use our expanded INITIAL_TASKS but provide a way to fetch them
  getTasksByTrack(trackId: string, allTasks: Task[]) {
    return allTasks.filter(t => t.trackId === trackId);
  }
};
