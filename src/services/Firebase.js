import {
  arrayRemove,
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/Firebase";
import { v4 as uuid } from "uuid";

export const loggedUser = (loggedUserId, userId) => {
  if (loggedUserId === userId) {
    return true;
  } else {
    return false;
  }
};

export const postIsLiked = (post, loggedUserId) => {
  if (post?.likes?.find((user) => user.userId === loggedUserId)) {
    return true;
  } else {
    return false;
  }
};

export const likePost = async (postId, loggedUserId) => {
  await updateDoc(doc(db, "posts", postId), {
    likes: arrayUnion({
      userId: loggedUserId,
    }),
  });
};

export const unLikePost = async (postId, loggedUserId) => {
  const ref = doc(db, "posts", postId);

  await updateDoc(ref, {
    likes: arrayRemove({
      userId: loggedUserId,
    }),
  });
};

export const commentOnPost = async (loggedUser, postId, commentText) => {
  if (!commentText) return;
  await updateDoc(doc(db, "posts", postId), {
    comments: arrayUnion({
      id: uuid(),
      text: commentText,
      postedBy: {
        id: loggedUser?.uid,
        displayName: loggedUser?.displayName,
        photoURL: loggedUser?.photoURL,
        date: Timestamp.now(),
      },
    }),
  });
};

export const followUser = async (otherUser, loggedUser) => {
  await updateDoc(doc(db, "users", otherUser?.uid), {
    followers: arrayUnion({
      user: {
        uid: loggedUser && loggedUser.uid,
        displayName: loggedUser && loggedUser.displayName,
        photoURL: loggedUser && loggedUser.photoURL,
      },
    }),
  });
  await updateDoc(doc(db, "users", loggedUser && loggedUser.uid), {
    following: arrayUnion({
      user: {
        uid: otherUser.uid,
        displayName: otherUser.displayName,
        photoURL: otherUser.photoURL,
      },
    }),
  });
};

export const unFollowUser = async (otherUser, loggedUser) => {
  await updateDoc(doc(db, "users", otherUser?.uid), {
    followers: arrayRemove({
      user: {
        uid: loggedUser && loggedUser.uid,
        displayName: loggedUser && loggedUser.displayName,
        photoURL: loggedUser && loggedUser.photoURL,
      },
    }),
  });
  await updateDoc(doc(db, "users", loggedUser && loggedUser.uid), {
    following: arrayRemove({
      user: {
        uid: otherUser?.uid,
        displayName: otherUser?.displayName,
        photoURL: otherUser?.photoURL,
      },
    }),
  });
};

// typeof a==='undefined'?follow(id,user):unFollow(id,user)





export const isFollowed = (loggedUserId, otherUser) => {

if(otherUser?.followers?.find((u) => u.user.uid === loggedUserId)){
  return true
}else{
  return false
}

// return typeof followed==="undefined"?false:true

};
