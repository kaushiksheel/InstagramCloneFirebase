import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";





export const UserInfo = ({ img, username, fullname, sm,action ,uid,follow,user}) => {
  const router=useRouter();




  return (
    <Box display="flex" alignItems={"center"} marginBottom={2}>
      <Box display="flex" alignItems="center" columnGap={2} flex={1}>
        <Avatar sx={{ width: sm?32:56, height:sm?32: 56 }} alt="Remy Sharp" src={img} />
        <Box>
          <Typography sx={{
            cursor:'pointer',
            fontSize:14
          }} onClick={()=>router.push(`/user/${uid}`)} >{fullname}</Typography>
          <Typography color='text.secondary' fontSize={12}>{username}</Typography>
        </Box>
      </Box>
      {sm
      &&

      <Typography onClick={()=>follow(user)} sx={{cursor:'pointer',fontSize:13,textTransform:'capitalize'}}>{action}</Typography>
      }
    </Box>
  );
};
