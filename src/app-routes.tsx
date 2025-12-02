//import { withNavigationWatcher } from "./contexts/navigation-context";
import {
  DietMasterPage,
  DietMainPage,
  DietDetailPage,
  LandingPage,
  DateDetailPage,
  SwellingMapChallengePage,
  SwellingMapMainPage,
  DateMainPage,
  DateDetailCoursePage,
  MealMainPage,
  MealDetailPage,
  MealRecPage,
} from "@/pages";

export const appRoutes = [
  { path: "/swellingmap/main", element: <SwellingMapMainPage /> },
  { path: "/swellingmap/challenge", element: <SwellingMapChallengePage /> },

  { path: "/diet/main", element: <DietMainPage /> },
  { path: "/diet/list", element: <DietMasterPage /> },
  { path: "/diet/detail/:mmCd", element: <DietDetailPage /> },

  { path: "/date/main", element: <DateMainPage /> },
  { path: "/date/detail/:dmCd", element: <DateDetailPage /> },
  { path: "/date/detailCourse/:ddCd/:dmCd", element: <DateDetailCoursePage /> },

  { path: "/admin/meal/main", element: <MealMainPage /> },
  { path: "/admin/meal/detail", element: <MealDetailPage /> },
  { path: "/admin/meal/rec", element: <MealRecPage /> },

  { path: "/", element: <LandingPage /> },
];

/*
export const appRoutes = routes.map((route) => {
  return {
    ...route,
    element: route.element//withNavigationWatcher(route.element, route.path),
  };
*/
