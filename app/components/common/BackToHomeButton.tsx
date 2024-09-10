"use client";
import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const BackToHomeButton: React.FC = () => {
  const router = useRouter();

  return (
    <Tooltip title="Back to Home" placement="left">
      <Fab
        color="primary"
        aria-label="back to home"
        onClick={() => router.push("/explore")}
        sx={{
          position: "fixed",
          bottom: 18,
          right: 18,
          backgroundColor: "#0077be",
          "&:hover": {
            transform: "scale(1.4)",
            backgroundColor: "#005c99",
          },

          transition: "all 0.3s ease-in-out",
        }}
      >
        <HomeIcon />
      </Fab>
    </Tooltip>
  );
};

export default BackToHomeButton;
