import { excludedRoutes } from "./data/data.ts";

export const useMain = () => {
  const isExcluded = excludedRoutes.some((route) => {
    if (window.innerWidth <= 768 && route.includes(":id")) {
      const baseRoute = route.replace("/:id", "");
      return (
        location.pathname.startsWith(baseRoute) &&
        location.pathname !== baseRoute
      );
    }
    return location.pathname === route;
  });

  return {
    isExcluded,
  };
};
