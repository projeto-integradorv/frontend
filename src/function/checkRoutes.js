import { APP_ROUTES } from "../constants/app-routes";

export const checkPublicRoute = (asPath) => {
    const publicRoutes = Object.values(APP_ROUTES.public);
    return publicRoutes.includes(asPath);
};
