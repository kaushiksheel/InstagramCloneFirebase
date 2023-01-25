import React from "react";
import { Card as Crd,Box } from "@mui/material";
import { Header } from "./Header";
import { Media } from "./Media";
import { Actions } from "./Actions";
import { useRecoilValue } from "recoil";
import { currentThemeState } from "@/recoil/atoms/currentThemeState";


export const Card = ({post,postId}) => {

  const darkMode=useRecoilValue(currentThemeState)


const {image,postedBy}=post;

// width={486}
// height={450}
  return (
    <Crd
      elevation
      sx={{ border:!darkMode &&"1px solid #dbdbdb",width:'100%',marginBottom:3 }}
    >
      <Header postedBy={postedBy}/>
  <Box sx={{
    width:'100%',
    height:450,
    position:'relative'
  }}>

      <Media img={image}/>
  </Box>
  

      <Actions darkMode={darkMode} post={post} postId={postId}/>
    
    </Crd>
  );
};
