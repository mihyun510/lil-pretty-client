//import { withNavigationWatcher } from "./contexts/navigation-context";
import { DietMasterPage, DietMainPage, LandingPage } from "@/pages";

export const appRoutes = [
  { path: "/diet/main", element: <DietMainPage /> },
  { path: "/diet/list", element: <DietMasterPage /> },
  { path: "/", element: <LandingPage /> },
];

/*
export const appRoutes = routes.map((route) => {
  return {
    ...route,
    element: route.element//withNavigationWatcher(route.element, route.path),
  };
*/
