import React, { Suspense } from "react";
import { Typography, Container, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import BackToHomeButton from "../components/common/BackToHomeButton";

const DynamicHomePageContent = dynamic(
  () => import("../components/HomePageContent"),
  {
    loading: () => <Typography>Loading...</Typography>,
    ssr: false,
  }
);

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Container maxWidth={false} className="mt-60 px-4 md:px-8">
        <Suspense fallback={<Typography>Loading...</Typography>}>
          <DynamicHomePageContent />
        </Suspense>
      </Container>
      <BackToHomeButton />
    </div>
  );
};

export default HomePage;
