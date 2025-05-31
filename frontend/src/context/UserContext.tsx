import { createContext } from "react";
import type { User } from "../types";

export interface UserContextType {
    user: User | null;
    isAuth: boolean;
    loading: boolean;
    btnLoading: boolean;
    loginUser: (
        email: string,
        password: string,
        navigate: (path: string) => void
    ) => Promise<void>;
    registerUser: (
        name: string,
        email: string,
        password: string,
        navigate: (path: string) => void
    ) => Promise<void>;
    addToPlaylist: (id: string) => void;
    logoutUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);