import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "./AuthContext";
import ApiContext from "./ApiContext";

export default function useAppGuard() {

    const navigate = useNavigate();

    const api = useContext(ApiContext);
    const auth = useContext(AuthContext);

    useEffect(() => {
        async function runGuards() {
            let apiOK = await api.guard();
            let authOK = await auth.guard();

            if (!(apiOK && authOK)) {
                navigate("/login");
            }
        }
        runGuards();
    }, [])
}