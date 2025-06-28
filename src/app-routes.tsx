//import { withNavigationWatcher } from "./contexts/navigation-context";
import { LandingPage } from "@/pages";

export const appRoutes = [{ path: "/", element: <LandingPage /> }];

/*
export const appRoutes = routes.map((route) => {
  return {
    ...route,
    element: route.element//withNavigationWatcher(route.element, route.path),
  };
*/
