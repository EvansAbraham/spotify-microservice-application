import { createContext } from "react";

export interface AdminContextType {
  title: string;
  setTitle: (title: string) => void;
  album: string;
  setAlbum: (album: string) => void;
  description: string;
  setDescription: (description: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  btnLoading: boolean;
  fileChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addAlbumHandler: (e: React.FormEvent) => Promise<void>;
  addSongHandler: (e: React.FormEvent) => Promise<void>;
  addThumbnailHandler: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);
