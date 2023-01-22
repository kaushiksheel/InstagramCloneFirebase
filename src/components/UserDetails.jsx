import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useGetUser } from "@/hooks/useGetUser";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  followUser,
  isFollowed,
  loggedUser,
  unFollowUser,
} from "@/services/firebaseLogics";

export const UserDetails = ({ postCount ,openModal}) => {
  const router = useRouter();

  const loggedInUser =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("user"));

  const userId = router.asPath.split("/")[2];
  const { user } = useGetUser(userId);

  const handleFollow = () => {
    isFollowed(loggedInUser.uid, user)
      ? unFollowUser(
          user,
          typeof window !== "undefined" &&
            JSON.parse(localStorage.getItem("user"))
        )
      : followUser(
          user,
          typeof window !== "undefined" &&
            JSON.parse(localStorage.getItem("user"))
        );
  };




  return (
    <Box sx={{ display: "flex", columnGap: 6 }}>
      <Image
        width={520}
        height={520}
        style={{
          width: 120,
          height: 120,
          objectFit: "cover",
          borderRadius: "100%",
        }}
        priority
        alt={user?.displayName}
        src={user?.photoURL}
      />
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 3 }}>
          <Typography fontSize={16}>{user?.displayName}</Typography>
          {loggedUser(loggedInUser.uid, userId) ? (
            <Button
              disableRipple
              disableElevation
              sx={{
                textTransform: "capitalize",
                fontSize: 13,
                paddingX: 3.4,
                background: "white",
                color: "black",
                border: "1px solid #dbdbdb",
                ":hover": {
                  backgroundColor: "white",
                },
              }}
              variant="contained"
              onClick={openModal}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollow}
              disableRipple
              disableElevation
              sx={{
                textTransform: "capitalize",
                fontSize: 13,
                paddingX: 3.4,
                background: "#1877F2",
                color:'white'
              }}
              variant="contained"
            >
              {isFollowed(loggedInUser.uid, user) ? "Following" : "Follow"}
            </Button>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: 3,
            marginTop: 2,
          }}
        >
          <Typography fontSize={16}>{postCount} posts</Typography>
          <Typography fontSize={16}>{user?.followers?.length} followers</Typography>
          <Typography fontSize={16}>{user?.following?.length} following</Typography>
        </Box>
        <Typography color='text.secondary' sx={{marginTop:2,fontSize:15,fontWeight:'bold'}}>{user?.username}</Typography>
      </Box>
    </Box>
  );
};
