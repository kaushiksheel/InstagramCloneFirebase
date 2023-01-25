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
              width={273.33}
              height={293}
              src={image}
              alt="user post"

              loading="lazy"
              style={{ objectFit: "cover"}}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
