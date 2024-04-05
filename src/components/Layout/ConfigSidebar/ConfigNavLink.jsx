import { NavLink } from 'react-router-dom'

function TtcNavLink({ link, text, icon, iconAlt, isSideBarOpen }) {

    return (
        <NavLink to={link} className={
            ({ isActive }) => ((isActive ? "active " : " ") + ("px-4 " + (isSideBarOpen ? 'justify-start' : "justify-center")))
        }
        >
            <img src={icon} className="injectable icon-md flex-none" alt={iconAlt} />
            <span className={"font-medium " + (isSideBarOpen ? 'px-2' : 'px-4 !hidden')}>{text}</span>
        </NavLink>
    )
}

export default TtcNavLink
