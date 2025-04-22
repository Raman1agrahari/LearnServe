 import { NavLink } from "react-router-dom";
 import "./Navbar.css";
 
export const Navbar = () => {
  return (
     <>
       <header>
        <div className="container">
            <div className='logo-brand'>
                <NavLink to="/">raman</NavLink>
            </div>

            <nav>
                <ul>
                    <li>
                    <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                    <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                    <NavLink to="/contact">Contact</NavLink>
                    </li>
                    <li>
                    <NavLink to="/services">Services</NavLink>
                    </li>
                    <li>
                    <NavLink to="/Register">Register</NavLink>
                    </li>
                    <li>
                    <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
       </header>
     </>
  )
}
