import React, { Fragment, useEffect } from "react";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import profile from "../../reducers/profile";
import ProfileItem from "./ProfileItem";

// {getProfiles, profile: {profiles, loading}
const Profiles = (props) => {

    useEffect(() => {
        props.getProfiles();
    }, [props.getProfiles])
        
    return(
        <Fragment>
            {props.profile.profiles.loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary">All Devs</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i>
                    Connect with devs
                </p>
                <div className="profiles">
                    {props.profile.profiles.length > 0 ? (
                        props.profile.profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    ) : <h4>No profile found</h4>}
                </div>
            </Fragment>}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles);