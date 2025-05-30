import { useContext } from "react";
import type { SongContextType } from "../context/SongContext";
import { SongContext } from "../context/SongContext";

export const useSongData = (): SongContextType => {
    const context = useContext(SongContext);
    if (!context) {
      throw new Error("useSongData must be used within a songProvider");
    }
    return context;
};