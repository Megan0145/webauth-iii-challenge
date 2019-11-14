import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';

export default function Navbar(props){
    const logout = () => {
        localStorage.removeItem("token");
        console.log(props)
    }
    return(
        <div>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/signup'>Signup</NavLink>
                <button onClick={logout}>Logout</button>
            </nav>
            <main>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
            </main>
        </div>
    );
}