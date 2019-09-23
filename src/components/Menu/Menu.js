import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

const menus = [
    {
        name: 'Home',
        to: '/',
        exact: true
    },
    {
        name: 'Products',
        to: '/products',
        exact: false
    }
];

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route 
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match })=>{
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link to={to}>
                            {label}
                        </Link>
                    </li>
                )
            }}
        />
    )
}

class Menu extends Component {
	render() {

        return (
            <div className="navbar navbar-default">
                <span className="navbar-brand">CALL API</span>
                <ul className="nav navbar-nav">
                    { this.showMenus(menus) }
                </ul>
            </div>
        );
    }

    showMenus = (menus) => {
        var result = null;
        if(menus.length > 0) {
            result = menus.map((menu,i)=>{
                return (
                    <MenuLink 
                        key={i}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                )
            })
        }

        return result;
    }
}

export default Menu;
