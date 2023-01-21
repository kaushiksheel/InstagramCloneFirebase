import { Header } from "@/components/Header";
import React from "react";
import { Timeline } from "@/components/Timeline";
import { Container } from "@/components/Container";
import { Sidebar } from "@/components/Sidebar";
import { Box, useMediaQuery } from "@mui/material";

import { useRouter } from "next/router";
import { useEffect } from "react";



function Home() {


const user=typeof window!=='undefined' && JSON.parse(localStorage.getItem("user"))

  
  const router=useRouter()
  
  useEffect(()=>{
  if(!user){
    router.push('/login')
  }
  
  },[router,user])


  const matches = useMediaQuery('(min-width:800px)');
  return (
    <>
      <Header />
      <main className="main">
        <Container>
          <Box sx={{ display: "flex", columnGap: 3 }}>
            <Timeline />
            {matches&&
            <Sidebar />
            }
          </Box>
        </Container>
      </main>
    </>
  );
}

export default Home;



