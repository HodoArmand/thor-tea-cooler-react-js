import React from 'react'

import SvgLibrary from '../../../common/SvgLibrary'

function handleLogout() {
    console.log("logout");
}

//  TODO: add onClick="ttcClient.logout()" functionality
function LogoutButton() {
    return (
        <button className="nav-items-logout" onClick={handleLogout}>
            <img src={SvgLibrary.logout} className="injectable icon-md" alt="🚪" />
            <span>Log out</span>
        </button>
    )
}

export default LogoutButton
