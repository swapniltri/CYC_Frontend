import axios from 'axios';
import index from '../store';
import { authActions } from '../store/authentication-slice';
import { messageActions } from '../store/message-slice';

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true, //send cookies along with all the api request.
});

api.interceptors.request.use((config) => {
    const state = index.getState();
    const token = state.authentication.accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const original = err.config;
        if (original.url.includes("/auth/refresh")) {
            return Promise.reject(err);
        }
        if (err.response?.status === 401 && !original._retry) {
            original._retry = true;
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/auth/refresh",
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = response.data.accessToken;
                const userId = response.data.userId;

                index.dispatch(authActions.setCredentials({ accessToken: newAccessToken, userId: userId }));
                original.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(original);
            } catch (e) {
                index.dispatch(messageActions.showMessage({
                    title: "Log Out",
                    message: "Youe session is expired, please Log In Again.",
                    type: "warn"
                }));
            }
        }
        return Promise.reject(err);
    }
);

export default api;