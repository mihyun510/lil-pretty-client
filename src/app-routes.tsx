//import { withNavigationWatcher } from "./contexts/navigation-context";
import {
  DietMasterPage,
  DietMainPage,
  DietDetailPage,
  LandingPage,
} from "@/pages";

export const appRoutes = [
  { path: "/diet/main", element: <DietMainPage /> },
  { path: "/diet/list", element: <DietMasterPage /> },
  { path: "/diet/detail", element: <DietDetailPage /> },
  { path: "/", element: <LandingPage /> },
];

/*
export const appRoutes = routes.map((route) => {
  return {
    ...route,
    element: route.element//withNavigationWatcher(route.element, route.path),
  };
*/
