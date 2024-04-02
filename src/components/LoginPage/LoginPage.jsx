import { useRef, useEffect } from 'react'


function LoginPage() {

    const bodyTag = useRef(document.getElementsByTagName("body")[0]);

    useEffect(() => {
        bodyTag.current.className = "login-body";
    }, []);

    return (
        <div>
            Login
        </div>
    )
}

export default LoginPage
