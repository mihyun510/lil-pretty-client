import { Routes, Route } from "react-router-dom";
import { appRoutes } from "@/app-routes";

export const AuthenticatedContents = () => {
  return (
    <Routes>
      {appRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};
