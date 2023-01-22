import { db } from '@/Lib/Firebase'
import { currentThemeState } from '@/recoil/atoms/currentThemeState'
import { stories } from '@/services/storiesData'
import { Box } from '@mui/material'
import { collection, onSnapshot } from 'firebase/firestore'
import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Card } from './Card'

export const Timeline = () => {
  const darkMode=useRecoilValue(currentThemeState)

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
    }, []);





  return (
    <Box sx={{flex:1}}>
      <Box sx={{ border:!darkMode &&"1px solid #dbdbdb",width:'100%',marginBottom:2,display:'flex',padding:2,columnGap:1 }}>
        {stories.map(({id,src})=>
<Image
src={src}
key={id}
alt='user stories'
width={250}
height={250}
style={{
  width:50,
  height:50,
  objectFit:'cover',
  borderRadius:'100%'
}}
loading='lazy'
/>
          )}

      </Box>
      <Box>
        
      {posts?.map(post=>
        <Card key={post.id} post={post.data} postId={post?.id}/>
        )}
      </Box>
    </Box>
  )
}
