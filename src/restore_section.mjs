import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const correctSection = `  useEffect(() => {
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
              displayName: currentUser.displayName || 'Engineer',
              email: currentUser.email || '',
              completedTasks: [],
              totalScore: 0,
              role: 'student',
              currentTrackId: 'programming-foundations',
              createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, 'users', currentUser.uid), newProfile);
            await setDoc(doc(db, 'leaderboard', currentUser.uid), {
              uid: currentUser.uid,
              displayName: newProfile.displayName,
              totalScore: 0,
              completedTasks: [],
            });
            setProfile(newProfile);
          } else {
            setProfile(existingProfile);
          }
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
  }, []);`;

// Match the mess from useEffect start to the end of the []
const messRegex = /useEffect\(\(\) =>\s+\{\s+let profileUnsubscribe[\s\S]*?, \[\]\);/;
content = content.replace(messRegex, correctSection);

fs.writeFileSync('src/App.tsx', content);
console.log('Restored useEffect section');
