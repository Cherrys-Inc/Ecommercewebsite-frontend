import React from "react";
import { NavLink,Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="container-fluid">
        <nav className="navbar navbar-expand-sm row frow">
            <div className="col-sm-7 navcol1">
                <div className="logo-text"> Ecom <i class="fa fa-cart-plus" aria-hidden="true"></i> </div>
                
            </div>
            <div className="col-sm-5 navcol2 text-right">
                <ul className="navbar-nav justify-content-center" id="links">
                <li>
                       <NavLink to="/" className="nav-link" >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className="nav-link" >Cart</NavLink>
                        </li>
                        <li>
                            <NavLink to="/orders" className="nav-link" >Orders</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className="nav-link" >Login</NavLink>
                        </li>
                </ul>
            </div>
        </nav>
        <input type="checkbox" id="hamburger-input" className="burger-shower" />
        <label id="hamburger-menu" for="hamburger-input">
                <nav id="sidebar-menu">
                    <ul>
                        <li>
                            <div className="logo-text pt-5"> Ecom <i className="fa fa-cart-plus p-4" aria-hidden="true"></i> </div>
                        </li>
                        <li>
                            <NavLink to="/" className="nav-link" >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className="nav-link" >Cart</NavLink>
                        </li>
                        <li>
                            <NavLink to="/orders" className="nav-link" >Orders</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>
                    </ul>
                </nav>
        </label>
        <div className="overlay"></div>
        
        
    </div>
    );
}
export default Navbar;