import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";


const Profile = (props) => {
    useEffect(() => {
        props.getProfileById(props.match.params.id)
    }, [props.getProfileById, props.match.params.id]);
    return(
        <Fragment>
            {props.profile.profile === null || props.profile.loading ? <Spinner /> : 
            <Fragment>
                <Link to="/profiles" className="btn btn-light">
                    Back to Profiles
                </Link>
                {props.auth.isAuthenticated && props.auth.loading === false && 
                props.auth.user._id === props.profile.profile.user._id && <Link to="/edit-profile" className="btn btn-dark">
                    Edit Profile
                </Link>}
                <div class="profile-grid my-1">
                    <ProfileTop profile={props.profile} />
                    <ProfileAbout profile={props.profile} />
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {props.profile.profile.experience.length > 0 ? (
                            <Fragment>
                                {props.profile.profile.experience.map(exp => (
                                    <ProfileExperience key={exp._id} experience={exp}/>
                                ))}
                            </Fragment>
                        ) : <h4>No experience</h4>}
                    </div>

                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {props.profile.profile.education.length > 0 ? (
                            <Fragment>
                                {props.profile.profile.education.map(edu => (
                                    <ProfileEducation key={edu._id} education={edu}/>
                                ))}
                            </Fragment>
                        ) : <h4>No education</h4>}
                    </div>
                </div>

            </Fragment>}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps,{getProfileById})(Profile);