import { ref, computed, onMounted } from "vue";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "date-portal.firebaseapp.com",
  projectId: "date-portal",
  storageBucket: "date-portal.firebasestorage.app",
  messagingSenderId: "21870411582",
  appId: "1:21870411582:web:c3fe2630d8a9c7a588b66f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const user = ref(null);
const loading = ref(true);
const error = ref(null);

export function useFirebase() {
  const login = async (email, password) => {
    try {
      error.value = null;
      loading.value = true;
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (email, password) => {
    try {
      error.value = null;
      loading.value = true;
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", credential.user.uid), {
        email: credential.user.email,
        aiEnabled: false,
        monthlyBudget: 500,
        createdAt: new Date(),
      });
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      error.value = err.message;
    }
  };

  const addDate = async (dateData) => {
    if (!user.value) return;

    try {
      await addDoc(collection(db, "dates"), {
        ...dateData,
        userId: user.value.uid,
        createdAt: new Date(),
      });
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const getDates = async () => {
    if (!user.value) return [];

    try {
      const q = query(
        collection(db, "dates"),
        where("userId", "==", user.value.uid),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      error.value = err.message;
      return [];
    }
  };

  const addReminder = async (reminderData) => {
    if (!user.value) return;

    try {
      await addDoc(collection(db, "reminders"), {
        ...reminderData,
        userId: user.value.uid,
        createdAt: new Date(),
      });
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const getReminders = async () => {
    if (!user.value) return [];

    try {
      const q = query(
        collection(db, "reminders"),
        where("userId", "==", user.value.uid),
        orderBy("date", "asc"),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      error.value = err.message;
      return [];
    }
  };

  const addPromise = async (promiseData) => {
    if (!user.value) return;

    try {
      await addDoc(collection(db, "promises"), {
        ...promiseData,
        userId: user.value.uid,
        completed: false,
        createdAt: new Date(),
      });
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const getPromises = async () => {
    if (!user.value) return [];

    try {
      const q = query(
        collection(db, "promises"),
        where("userId", "==", user.value.uid),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      error.value = err.message;
      return [];
    }
  };

  const updatePromise = async (promiseId, updates) => {
    try {
      await updateDoc(doc(db, "promises", promiseId), updates);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateDate = async (dateId, updates) => {
    try {
      await updateDoc(doc(db, "dates", dateId), updates);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const getUserSettings = async () => {
    if (!user.value) return null;

    try {
      const docRef = doc(db, "users", user.value.uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (err) {
      error.value = err.message;
      return null;
    }
  };

  const updateUserSettings = async (settings) => {
    if (!user.value) return;

    try {
      await updateDoc(doc(db, "users", user.value.uid), settings);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const deleteReminder = async (reminderId) => {
    try {
      await deleteDoc(doc(db, "reminders", reminderId));
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const deleteDate = async (dateId) => {
    try {
      await deleteDoc(doc(db, "dates", dateId));
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const deletePromise = async (promiseId) => {
    try {
      await deleteDoc(doc(db, "promises", promiseId));
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateReminder = async (reminderId, updates) => {
    try {
      await updateDoc(doc(db, "reminders", reminderId), updates);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  onMounted(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
      loading.value = false;
    });
  });

  return {
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    login,
    register,
    logout,
    addDate,
    getDates,
    addReminder,
    getReminders,
    addPromise,
    getPromises,
    updatePromise,
    getUserSettings,
    updateUserSettings,
    updateDate,
    updateReminder,
    deleteReminder,
    deleteDate,
    deletePromise,
  };
}
