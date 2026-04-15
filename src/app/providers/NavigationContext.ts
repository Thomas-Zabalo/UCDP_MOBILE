import { createContext } from "react";
import {type NavigationStack, navStack} from "../core/data/navigationStack.ts";

export const NavigationContext = createContext<NavigationStack>(navStack);