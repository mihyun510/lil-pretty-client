//import { withNavigationWatcher } from "./contexts/navigation-context";
import {
  DietMasterPage,
  DietMainPage,
  DietDetailPage,
  LandingPage,
} from "@/pages";
import DateMainPage from "@/pages/date/DateMainPage";
export const appRoutes = [
  { path: "/diet/main", element: <DietMainPage /> },
  { path: "/diet/list", element: <DietMasterPage /> },
  { path: "/diet/detail/:mmCd", element: <DietDetailPage /> },
  { path: "/date/main", element: <DateMainPage /> },
  { path: "/", element: <LandingPage /> },
];

/*
export const appRoutes = routes.map((route) => {
  return {
    ...route,
    element: route.element//withNavigationWatcher(route.element, route.path),
  };
*/
