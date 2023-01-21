import React from "react";
import { Modal, Box, Button } from "@mui/material";
import { useState } from "react";
import { useStorage } from "@/hooks/useStorage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthListener } from "@/hooks/useAuthListener";
import { db } from "@/Lib/Firebase";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";

export const PostUploadModal = ({ openModal, handleCloseModal }) => {
    const[caption,setCaption]=useState("")
    const[file,setFile]=useState();
    const {progress,url,setProgress,setUrl}=useStorage(file)
    
    const {user}=useAuthListener()


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius:2
  };

  const posts = collection(db, "posts");
  const date = new Date().getTime();
 
  const handlePost = async () => {
    if(file){

        await addDoc(posts, {
          caption,
          image: url,
          likes: [],
          comments: [],
          createdAt: serverTimestamp(),
          postedBy: {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          },
        }).then(()=>{
          setProgress(0)
          setUrl("")
          handleCloseModal()});
    }
             
  };


  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <input
          type="text"
          placeholder="caption"
          style={{ width: "100%", fontSize: 15, padding: 4, height: 40 }}
          value={caption}
          onChange={e=>setCaption(e.target.value)}
        />
        <input
          type="file"
          placeholder="caption"
          onChange={e=>setFile(e.target.files[0])}
          style={{
            width: "100%",
            fontSize: 15,
            padding: 4,
            height: 40,
            marginTop: 14,
          }}
        />
{progress>0&&
<CircularProgressWithLabel progress={progress} />
}

        <Button
        disabled={!url}
        onClick={handlePost}
          disableElevation
          disableRipple
          variant="contained"
          sx={{
            width: "100%",
            marginTop: 3,
            textTransform: "capitalize",
            fontSize: 14,
          }}
        >
          Post
        </Button>
      </Box>
    </Modal>
  );
};
