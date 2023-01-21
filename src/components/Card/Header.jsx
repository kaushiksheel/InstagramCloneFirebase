import { Box, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export const Header = ({ postedBy }) => {
  const { displayName, photoURL,uid } = postedBy;
  const router=useRouter();



  return (
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
        <Image
          src={photoURL}
          width={30}
          height={30}
          alt="user dp"
          loading="lazy"
          style={{ borderRadius: "100%", objectFit: "cover" }}
        />
        <Typography onClick={()=>router.push(`/user/${uid}`)} sx={{ fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
          {displayName}
        </Typography>
      </Box>
    </CardContent>
  );
};
