import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const baseurl = import.meta.env.VITE_API_URL;

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  isLoggedIn: boolean;
  token: string;
  login: (username: string, password: string) => void;
  logout: () => void;
  authenticate: (tid: string) => void;
  deleteEmployee?: (id: string) => void;
  isAuthenticated: boolean;
};

const initialAuthContext: IAuthContext = {
  isLoggedIn: false,
  token: "",
  login: () => {},
  logout: () => {},
  authenticate: () => {},
  deleteEmployee: () => {},
  isAuthenticated: false,
};

const AuthContext = createContext<IAuthContext>(initialAuthContext);

const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", "");
  // const [user, setUser] = useLocalStorage("user", {});
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const login = async (username: string, password: string) => {
    const tid = toast.loading("Logging in...");

    const response = await fetch(`${baseurl}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();
    if (json.status !== 200) {
      toast.error(json.message, { id: tid });
      return;
    }

    // setUser(json.data.user);
    setToken(json.data.token);
    toast.success(json.message, { id: tid });
    navigate("/admin", { replace: true });
  };

  // To move it to data context
  const deleteEmployee = async (id: string) => {
    try {
      const response = await fetch(`${baseurl}/admin/employee`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const json = await response.json();
      if (json.status === 200) {
        toast.success("Employee deleted successfully");
        window.location.reload();
        return json.data;
      } else {
        toast.error("Error deleting employee");
        throw new Error(json.message);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("You are not authorized to perform this action");
        logout();
        navigate("/login");
      }
      throw error; // Re-throw error to be handled by the caller
    }
  };

  const logout = () => {
    setToken("");
    toast.error("Logged out");
    navigate("/login");
  };

  const authenticate = async (tid: string) => {
    if (token) {
      const response = await fetch(`${baseurl}/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      if (json.status === 200) return;
      setToken("");
    }
    toast.error("Session expired", { id: tid });
    navigate("/login");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        token,
        logout,
        authenticate,
        deleteEmployee,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, AuthContext };
