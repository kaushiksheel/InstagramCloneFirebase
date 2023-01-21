import { useEffect,useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/Lib/firebase";


export const useGetUser = (userId) => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (!userId) return;
    const userRef = query(collection(db, "users"), where("uid", "==", userId));
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      setUser(snapshot.docs.map((doc) => ({ data: doc.data() }))[0]?.data);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return { user };
};
