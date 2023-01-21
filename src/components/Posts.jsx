import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";

export const Posts = ({ posts }) => {
  return (
    <Box marginTop={5}>
      <Typography variant="h4">Posts({posts?.length})</Typography>

      <Grid container spacing={2} marginTop={2}>
        {posts?.map(({ id, data: { image } }) => (
          <Grid key={id} item lg={4} xs={12} md={6}>
            <Image
              width={500}
              height={500}
              src={image}
              alt="user post"
              loading="lazy"
              style={{ objectFit: "cover", width: "100%", height: 293 }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
