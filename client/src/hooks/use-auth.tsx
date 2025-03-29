import { useMemo } from "react";
import Cookies from "js-cookie";

export interface AuthUser {
  id: string;
  role: "ADMIN" | "CLIENT" | "MEMBER" | null;
}

const useAuth = (): AuthUser | null => {
  const parsedUser = useMemo(() => {
    const userId = Cookies.get("UserId");
    const userRole = Cookies.get("UserRole");

    if (!userId || !userRole) {
      return null;
    }

    // Validate role
    const validRoles = ["ADMIN", "CLIENT", "MEMBER"];
    const role = validRoles.includes(userRole)
      ? (userRole as AuthUser["role"])
      : null;

    if (!role) return null;

    return {
      id: userId,
      role,
    } as AuthUser;
  }, []);

  return parsedUser;
};

export default useAuth;
