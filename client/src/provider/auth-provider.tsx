import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchVerfiy } from "../api";
import { useBoundStore } from "../store/client/use-store";

export interface AuthStateProps {
  isAuth: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthStateProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useBoundStore();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchData = async () => {
        try {
          const data = await fetchVerfiy();
          setIsAuth(data?.message == "success");
          setIsLoading(false);
          setUser(data?.data);
        } catch (err) {
          setIsLoading(false);
          setIsAuth(false);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    } else {
      setIsLoading(false);
      setIsAuth(false);
    }
  }, []);

  if (isLoading) {
    return <div>isLoading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
