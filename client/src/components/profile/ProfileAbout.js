import React, { Fragment } from "react";
import ProfileTop from "./ProfileTop";

const ProfileAbout = (props) => {
    let values = props.profile.profile;
    console.log(values);
    return (
        <Fragment>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{values.user.name}'s Bio</h2>
            {
                values.bio &&
                <Fragment>
                   <p>
                       {values.bio} 
                   </p>
                </Fragment>
            } 
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
          {values.skills.map((s, i) => (
            <div className="p-1" key={i}><i class="fa fa-check"></i>{s}</div>
          ))}
          </div>
        </div>
        </Fragment>
    );
};

export default ProfileAbout;