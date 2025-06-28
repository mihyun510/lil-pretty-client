import { Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages";

export const UnAuthenticatedContents = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
    </Routes>
  );
};
