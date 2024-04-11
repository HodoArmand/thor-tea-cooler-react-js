import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../common/AuthContext';


import SvgLibrary from '../../../common/SvgLibrary'
import ModalContext from '../Modal/ModalContext';

function LogoutButton() {

    const auth = useContext(AuthContext);
    const modal = useContext(ModalContext)
    const navigate = useNavigate();


    async function handleLogout() {
        const loggedOut = await auth.logout();
        if (loggedOut) {
            navigate('/login');
        }
        else {
            console.log("Unsuccessful Logout.");
            modal.setTitle('Error');
            modal.setDesc('Unsuccessful Logout. This is likely due to a TTC device server error.');
            modal.setIsOpen(true);
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
