import React,{useState,useEffect} from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore'

import { db } from '@/Lib/Firebase'


export const useUserPosts = (userId) => {
    const[posts,setPosts]=useState([])



    useEffect(() => {
        if (!userId) return;
        const q = query(
          collection(db, "posts"),
          where("postedBy.uid", "==", userId)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          let data = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
          data.sort((a, b) => b.data.createdAt - a.data.createdAt);
          setPosts(data);
        });
        return () => {
          unsubscribe();
        };
      }, [userId]);
  return {posts}
}
