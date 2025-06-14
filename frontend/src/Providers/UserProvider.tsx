import axios from "axios";
import type { User } from "../types";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { type ReactNode, useEffect, useState } from "react";

const server = import.meta.env.VITE_USER_API;

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    async function registerUser(
        name: string,
        email: string,
        password: string,
        navigate: (path: string) => void
    ) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/v1/user/register`,{
                name,
                email,
                password
            });

            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred");
            } else {
                toast.error("An unexpected error occurred");
            }
            setBtnLoading(false);
        };
    };

    async function loginUser(
        email: string,
        password: string,
        navigate: (path: string) => void
    ) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/v1/user/login`, {
                email,
                password,
              });
        
              toast.success(data.message);
              localStorage.setItem("token", data.token);
              setUser(data.user);
              setIsAuth(true);
              setBtnLoading(false);
              navigate("/");
        } catch(error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred");
            } else {
                toast.error("An unexpected error occurred");
            }
            setBtnLoading(false);
        }
    }

    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
        return;
      }
        try {
          const { data } = await axios.get(`${server}/api/v1/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          setUser(data.user || data);
          setIsAuth(true);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }

      async function logoutUser() {
        localStorage.clear();
        setUser(null);
        setIsAuth(false);
    
        toast.success("User Logged Out");
      }

      async function addToPlaylist(id: string) {
        try {
          const token = localStorage.getItem("token");
          const { data } = await axios.post(
            `${server}/api/v1/song/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          toast.success(data.message);
          fetchUser();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "An error occurred");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
      }

      useEffect(() => {
        fetchUser();
      }, []);
      return (
        <UserContext.Provider
          value={{
            user,
            loading,
            isAuth,
            btnLoading,
            loginUser,
            registerUser,
            logoutUser,
            addToPlaylist,
          }}
        >
          {children}
          <Toaster />
        </UserContext.Provider>
      );
};