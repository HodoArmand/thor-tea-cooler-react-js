import { NavLink } from 'react-router-dom'

function TtcNavLink({ link, text, icon, iconAlt }) {

    return (
        <NavLink to={link} className={
            ({ isActive }) => isActive ? "nav-items-active" : "nav-items"
        }
        >
            <img src={icon} className="injectable icon-md" alt={iconAlt} />
            <div>{text}</div>
        </NavLink>
    )
}

export default TtcNavLink
