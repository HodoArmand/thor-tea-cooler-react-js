import { useContext } from 'react'
import AuthContext from '../../../common/AuthContext';


import SvgLibrary from '../../../common/SvgLibrary'

function LogoutButton() {

    const auth = useContext(AuthContext);

    const handleLogout = () => {
        auth.logout();
    }

    return (
        <button className="nav-items-logout" onClick={handleLogout}>
            <img src={SvgLibrary.logout} className="injectable icon-md" alt="🚪" />
            <span>Log out</span>
        </button>
    )
}

export default LogoutButton
