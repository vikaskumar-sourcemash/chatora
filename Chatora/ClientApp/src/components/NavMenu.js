import React, { Component, useState } from 'react';
import { useAuth0 } from "../react-auth0-wrapper";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export function NavMenu() {

    const [collapsed, toggleNavbar] = useState(true);
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">Chatora</NavbarBrand>
                    <NavbarToggler onClick={() => toggleNavbar(!collapsed)} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/chat-app">Chat App</NavLink>
                            </NavItem>
                            <NavItem>
                                {!isAuthenticated && (
                                    <NavLink className="text-dark" href="#"
                                        onClick={() =>
                                            loginWithRedirect({})
                                        }
                                    >
                                        Log in
                                     </NavLink>
                                )}
                                {isAuthenticated && <NavLink className="text-dark" href="#"
                                    onClick={() => logout()}>Log out</NavLink>}
                                
                            </NavItem>
                            <NavItem>
                                {isAuthenticated && (
                                    <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                                )}
                            </NavItem>

                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );

}
