import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../common/AuthContext';


import SvgLibrary from '../../../common/SvgLibrary'

function LogoutButton() {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    //  TODO: modal
    async function handleLogout() {
        const loggedOut = await auth.logout();
        if (loggedOut) {
            navigate('/login');
        }
        else {
            console.log("Unsuccessful Logout.");
        }
    }

    return (
        <button className="nav-items-logout" onClick={() => handleLogout()}>
            <img src={SvgLibrary.logout} className="injectable icon-md" alt="🚪" />
            <span>Log out</span>
        </button>
    )
}

export default LogoutButton
