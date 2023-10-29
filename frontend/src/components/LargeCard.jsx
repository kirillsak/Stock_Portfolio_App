import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

function LargeCard() {
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "80%",
          minWidth: 300,
          maxWidth: 1200,
          minHeight: 500,
          m: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Your Large Card Title
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Subtitle or additional text
          </Typography>
          <Typography variant="body2">
            Content goes here. You can add more text, images, or other elements
            as needed.
          </Typography>
        </CardContent>
        <Button size="small" sx={{ m: 2 }}>
          Action Button
        </Button>
      </Card>
    </Box>
  );
}

export default LargeCard;
