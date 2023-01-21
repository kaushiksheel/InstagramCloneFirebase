import React from "react";
import { Modal, Box, Button, TextField ,CircularProgress} from "@mui/material";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { useAuthListener } from "@/hooks/useAuthListener";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/Lib/Firebase";

export const EditProfileModal = ({ openModal, closeModal }) => {

const[fullname,setFullname]=useState("")
const[username,setUsername]=useState("")
const[loading,setLoading]=useState(false);


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
    borderRadius: 2,
  };

const inputStyles={
  ".MuiInputBase-input": { fontSize: "1.5rem" },
width:'100%',
marginBottom:3
}








const handleUpdateProfile = async ( ) => {
  setLoading(true)
  if ( !username || !fullname) return;


        try {
          await updateProfile(user, {
            displayName: fullname?fullname:user.fullname,
          });
          await updateDoc(doc(db, "users", user && user.uid), {
            displayName: fullname?fullname:user.fullname,
            username:username?username:user.username,
          })
          .then(()=>{
            setLoading(false)
            closeModal()
          })
        } catch (e) {
          setLoading(false)
          console.log(e);
        }
    

    setFullname("")
    setUsername("")
  
};













  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          className="input"
          sx={inputStyles}
          id="outlined-basic"
          label="Fullname"
          variant="outlined"
          value={fullname}
          onChange={e=>setFullname(e.target.value)}
        />
        <TextField
        
          className="input"
          sx={inputStyles}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={e=>setUsername(e.target.value)}
        />
        <Button disabled={!fullname||!username} onClick={handleUpdateProfile} color="info" sx={{width:'100%',textTransform:"capitalize",fontSize:15}} variant="contained">
          {loading?
        <CircularProgress  color="inherit" size={15}/>
        :
        "Save"
          }
          
          </Button>
      </Box>
    </Modal>
  );
};
