import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { UserInfo } from "./UserInfo";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/Lib/Firebase";
import { followUser, isFollowed, unFollowUser } from "@/services/firebaseLogics";

export const Sidebar = () => {
  const [users, setUsers] = useState([]);

  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const userRef = query(
      collection(db, "users"),
      where("uid", "!=", user && user.uid)
    );
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleFollow = (otherUser) => {
    isFollowed(user?.uid, otherUser)
      ? unFollowUser(otherUser, user)
      : followUser(otherUser, user);
  };

  return (
    <>
      <Box sx={{ width: 340 }}>
        <UserInfo
          username="devil32"
          fullname={user?.displayName}
          img={user?.photoURL}
          action={"switch"}
          uid={user?.uid}
          follow={handleFollow}
          user={user}
        />
        <Typography color="text.secondary" fontSize={13} sx={{ marginY: 2 }}>
          People you may know
        </Typography>
        {users?.map(({ id, data }) => (
          <UserInfo
            key={id}
            username={data.username}
            fullname={data.displayName}
            img={data.photoURL}
            sm={true}
            action={isFollowed(user?.uid, data) ? "Following" : "Follow"}
            uid={data.uid}
            follow={handleFollow}
            user={data}
          />
        ))}
      </Box>
    </>
  );
};
