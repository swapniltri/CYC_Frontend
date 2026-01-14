import { jwtDecode } from "jwt-decode";

export const GetUserIdFromToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.sub;
    } catch (error) {
        return null;
    }
}