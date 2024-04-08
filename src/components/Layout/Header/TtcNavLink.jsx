import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'

function TtcNavLink({ link, text, icon, iconAlt }) {

    const { pathname } = useLocation();
    const [configIsActive, setConfigIsActive] = useState(false);

    useEffect(() => {
        setConfigIsActive(['/networkConfiguration', '/hardwareConfiguration', '/serverConfiguration', '/userConfiguration'].includes(pathname) &&
            ['/networkConfiguration', '/hardwareConfiguration', '/serverConfiguration', '/userConfiguration'].includes(link));
    }, []);

    return (
        <NavLink to={link} className={
            ({ isActive }) => (isActive || configIsActive) ? "nav-items-active" : "nav-items"
        }
        >
            <img src={icon} className="injectable icon-md" alt={iconAlt} />
            <div>{text}</div>
        </NavLink>
    )
}

export default TtcNavLink
