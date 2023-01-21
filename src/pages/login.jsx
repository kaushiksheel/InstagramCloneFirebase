import React from "react";
import { Box, Button } from "@mui/material";
import InstaLogo from "../../public/assets/InstagramLogo.svg";
import Image from "next/image";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "@/Lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { themeState } from "./_app";


function Login() {

  const [darkMode, setDarkMode] = useRecoilState(themeState);

const router=useRouter();

const user=typeof window!=='undefined' && JSON.parse(localStorage.getItem("user"))


  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        const { uid, displayName, email, photoURL } = user;




        if (user) {
          await setDoc(doc(db, "users", uid), {
            uid,
            displayName,
            email,
            photoURL,
            followers:[],
            following:[],
  username:displayName.split(" ")[0]
          });
        }
        router.push('/')
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };








  
  useEffect(()=>{
  if(user){
    router.push('/')
  }
  
  },[router,user])



  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "grid" }}>
      <Box marginTop={12}>
        <Image
          style={{ margin: "auto", display: "block",filter:darkMode&&"invert(1)" 
        }}
          width={203}
          height={109}
          src={InstaLogo}
          className="object-contain"
          alt="instagram logo"
        />
        <Button
          sx={{
            border: "1px solid #dbdbdb",
            color:darkMode?'white': "black",
            fontSize: 15,
            textTransform: "capitalize",
            margin: "auto",
            display: "block",

          }}
          disableElevation
          disableRipple
          onClick={handleLogin}
        >
          Login with google
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
