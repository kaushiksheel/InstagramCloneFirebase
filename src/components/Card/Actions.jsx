import { Box, CardContent, Typography } from "@mui/material";
import React from "react";
import {
  HeartIcon,
  ChatBubbleBottomCenterIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useRef } from "react";
import {
  commentOnPost,
  likePost,
  postIsLiked,
  unLikePost,
} from "@/services/firebaseLogics";
import { useAuthListener } from "@/hooks/useAuthListener";
import { useState } from "react";

export const Actions = ({ post, postId,darkMode }) => {
  const { user } = useAuthListener();
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    postIsLiked(post, user?.uid)
      ? unLikePost(postId, user?.uid)
      : likePost(postId, user?.uid);
  };

  const handleComment = () => {
    commentOnPost(user, postId, commentText);
    setCommentText("");
  };

  const inputRef = useRef(null);
  return (
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
        {postIsLiked(post, user?.uid) ? (
          <HeartIconSolid
            color="red"
            onClick={() => handleLike(post)}
            cursor={"pointer"}
            height={25}
            width={25}
          />
        ) : (
          <HeartIcon
            onClick={() => handleLike(post)}
            cursor={"pointer"}
            height={25}
            width={25}
          />
        )}
        <ChatBubbleBottomCenterIcon
          onClick={() => inputRef.current.focus()}
          cursor={"pointer"}
          height={25}
          width={25}
        />
        <ShareIcon cursor={"pointer"} height={25} width={25} />
      </Box>
      <Typography sx={{ fontSize: 13, marginTop: 1 }}>
        {post?.likes?.length} Likes
      </Typography>
      <Typography sx={{ fontSize: 13, marginTop: 1 }}>
        {post?.postedBy?.displayName} {post?.caption}
      </Typography>
      <Typography color="gray" sx={{ fontSize: 13, marginTop: 1 }}>
        comments
      </Typography>
      {post?.comments?.map(({ id, text, postedBy: { displayName } }) => (
        <Typography key={id} sx={{ fontSize: 13, marginY: 1 }}>
          {displayName} {text}
        </Typography>
      ))}
      <Box display="flex" alignItems="center" columnGap={1}>
        <input
          ref={inputRef}
          style={{ width: "100%", height: 40, padding: 4,marginTop:12 ,
        background:darkMode && "#242424",
        border:'none'
        }}
          type="text"
          placeholder="Add a comment..."
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        <Typography
          fontWeight={"bold"}
          fontSize={14}
          color="#1877F2"
          cursor="pointer"
          onClick={handleComment}
          sx={{ cursor: "pointer" }}
        >
          Post
        </Typography>
      </Box>
    </CardContent>
  );
};
