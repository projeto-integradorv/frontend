import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkUserAuthenticated, checkAdminAccess } from "@/function/checkUserAuthenticade";
import { APP_ROUTES } from "@/constants/app-routes";

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { push } = useRouter();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [hasAdminAccess, setHasAdminAccess] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const authenticated = checkUserAuthenticated();
            setIsUserAuthenticated(authenticated);

            if (authenticated) {
                if (adminOnly) {
                    const adminAccess = checkAdminAccess();
                    setHasAdminAccess(adminAccess);
                    push(APP_ROUTES.private.admin);
                } else {
                    setHasAdminAccess(true); 
                }
            } else {
                push(APP_ROUTES.public.login);
            }
        }
    }, [push, adminOnly]);

    useEffect(() => {
        if (isUserAuthenticated) {
            if (adminOnly && !hasAdminAccess) {
                push(APP_ROUTES.public.home); 
            }
        }
    }, [isUserAuthenticated, hasAdminAccess, push, adminOnly]);

    if (!isUserAuthenticated || (adminOnly && !hasAdminAccess)) {
        return null;
    }

    return children;
};

export default PrivateRoute;
