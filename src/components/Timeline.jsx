import { db } from '@/Lib/Firebase'
import { Box } from '@mui/material'
import { collection, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Card } from './Card'

export const Timeline = () => {


  const[posts,setPosts]=useState([])

  const postsCollection = collection(db, "posts");

  useEffect(() => {
      const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
         const data=snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
         data.sort((a,b)=>b.data.createdAt-a.data.createdAt)
     setPosts(data);
      });
  
      return () => {
        unsubscribe();
      };
    }, [postsCollection]);





  return (
    <Box sx={{flex:1}}>
      {posts?.map(post=>
        <Card key={post.id} post={post.data} postId={post?.id}/>
        )}
    </Box>
  )
}
