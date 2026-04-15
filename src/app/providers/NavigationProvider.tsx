import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { navStack } from "../core/data/navigationStack.ts";
import { NavigationContext } from "./NavigationContext";

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    navStack.push(location.pathname);
  }, [location.pathname]);

  return (
      <NavigationContext.Provider value={navStack}>
        {children}
      </NavigationContext.Provider>
  );
}

export function useNavigationStack() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationStack must be used within a NavigationProvider");
  }
  return context;
}