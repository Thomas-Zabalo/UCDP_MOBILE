import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { type NavigationStack, navStack } from "../data/data.ts";

const NavigationContext = createContext<NavigationStack>(navStack);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  useEffect(() => {
    navStack.push(location.pathname);
  }, [location]);

  return (
    <NavigationContext.Provider value={navStack}>
      {children}
    </NavigationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNavigationStack() {
  return useContext(NavigationContext);
}
