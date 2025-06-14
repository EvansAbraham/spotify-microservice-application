import axios from "axios";
import toast from "react-hot-toast";
import { useSongData } from "../hooks/useSongData";
import { type ChangeEvent, type FormEvent, useState } from "react";

const server = import.meta.env.VITE_ADMIN_API;

export const useAdminActions = () => {
    const { fetchAlbums, fetchSongs } = useSongData();

    const [title, setTitle] = useState<string>("");
    const [album, setAlbum] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);

    const buildFormData = (entries: [string, string | Blob] []) => {
        const formData = new FormData();
        entries.forEach(([key, value]) => formData.append(key, value));
        return formData;
    }

    const token = localStorage.getItem("token");

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      };
      

    const handleError = (error: unknown) => {
        if (error instanceof Error) {
            toast.error(error.message || "An error occurred");
        } else if (typeof error === "object" && error !== null && "response" in error) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || "An error occurred");
        } else {
            toast.error("An unknown error occurred");
        }
    };      

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    }

    const resetFields = (options?: { resetAlbum?: boolean }) => {
        setTitle("");
        setDescription("");
        setFile(null);
      
        if (options?.resetAlbum) {
          setAlbum("");
        }
      };

    const addAlbumHandler = async (e: FormEvent) => {
        e.preventDefault();
    
        if (!file) return;
    
        const formData = buildFormData([
            ["title", title],
            ["description", description],
            ["file", file]
        ]);
    
        setBtnLoading(true);
    
        try {
          const { data } = await axios.post(
            `${server}/api/v1/album/new`,
            formData,
            authHeaders
          );
    
          toast.success(data.message);
          fetchAlbums();
          resetFields();
        }
        catch (error: unknown) {
          handleError(error);
        }
        finally {
            setBtnLoading(false);
        }
      }

    const addSongHandler = async ( e: FormEvent ) => {
        e.preventDefault();
        
        if (!file) return;

        const formData = buildFormData([
            ["title", title],
            ["description", description],
            ["file", file],
            ["album", album]
        ]);

        setBtnLoading(true);

        try {
            const { data } = await axios.post(`${server}/api/v1/song/new`, formData, authHeaders)
            toast.success(data.message);
            fetchSongs();
            resetFields({ resetAlbum: true });

        } 
        catch (error: unknown) {
            handleError(error);
        }
        finally {
            setBtnLoading(false);
        }
    }

    const addThumbnailHandler = async (id: string) => {
        
        if (!file) return;

        const formData = buildFormData([
            ["file", file]
        ]);

        setBtnLoading(true);

        try {
            const { data } = await axios.post(`${server}/api/v1/song/${id}`, formData, authHeaders);
            toast.success(data.message);
            fetchSongs();
            setFile(null);
        } catch (error: unknown) {
            handleError(error);
        }
        finally {
            setBtnLoading(false);
        }
    }

    const deleteAlbum = async (id: string) => {
        if(confirm("Are you sure you want to delete this album?")) {
            setBtnLoading(true);
            try {
                const { data } = await axios.delete(`${server}/api/v1/album/${id}`, authHeaders);
                toast.success(data.message);
                fetchSongs();
                fetchAlbums();
            }
            catch (error: unknown) {
                handleError(error);
            }
            finally {
                setBtnLoading(false);
            }
        }
    }

    const deleteSong = async (id: string) => {
        if (confirm("Are you sure you want to delete this song?")) {
            setBtnLoading(true);
            try {
                const { data } = await axios.delete(`${server}/api/v1/song/${id}`, authHeaders);
                toast.success(data.message);
                fetchSongs(); 
            }
            catch (error: unknown) {
                handleError(error);
            }
            finally {
                setBtnLoading(false);
            }
        }
    }

    return {
        fileChangeHandler,
        addAlbumHandler,
        addSongHandler,
        addThumbnailHandler,
        deleteAlbum,
        deleteSong,
        btnLoading,
        title,
        setTitle,
        description,
        setDescription,
        album,
        setAlbum,
        file,
        setFile,
    }
}
