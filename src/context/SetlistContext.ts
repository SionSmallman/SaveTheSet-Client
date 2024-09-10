import { createContext } from "react";
import { Setlist } from "../components/SetlistEditPageComponents/Interfaces/Setlist.interfaces";

export const SetlistContext = createContext<Setlist | undefined>(undefined);
