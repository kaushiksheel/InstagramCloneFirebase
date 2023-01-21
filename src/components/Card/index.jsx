import React from "react";
import { Card as Crd } from "@mui/material";
import { Header } from "./Header";
import { Media } from "./Media";
import { Actions } from "./Actions";
import { useRecoilValue } from "recoil";
import { currentThemeState } from "@/recoil/atoms/currentThemeState";


export const Card = ({post,postId}) => {

  const darkMode=useRecoilValue(currentThemeState)


const {image,postedBy}=post;


  return (
    <Crd
      elevation
      sx={{ border:!darkMode &&"1px solid #dbdbdb",width:'100%',marginBottom:3 }}
    >
      <Header postedBy={postedBy}/>
      <Media img={image}/>
      <Actions darkMode={darkMode} post={post} postId={postId}/>
    
    </Crd>
  );
};
