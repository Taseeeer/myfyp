import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Landing = ({ isAuthenticated }) => {

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return(
        <React.Fragment>
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                    <h1 className="x-large csq">CS-Questions</h1>
                    <p className="lead">
                        Ask us in language you prefer.
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);