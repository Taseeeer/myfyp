import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import auth from "../../reducers/auth";

const Navbar = (props) => {

    const authLinks = (
                <ul>
                    <li>
                    <Link to="/profiles">
                    All Devs     
                    </Link>
                    </li>
                    <li>
                    <Link to="/posts">
                    Posts
                    </Link>
                    </li>
                    <li>
                    <Link to="/dashboard">
                    <i className="fas fa-user"/> {" "}
                    Dashboard
                    </Link></li>
                    <li>
                        <a onClick={props.logout} href="/">Logout</a>
                    </li>
                </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">All-Devs</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return( 
        <React.Fragment>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-laptop"></i> CS-Questions</Link>
                </h1>
                {!props.auth.loading && (<Fragment>{props.auth.isAuthenticated ? authLinks : guestLinks}</Fragment>) }
            </nav> 
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);