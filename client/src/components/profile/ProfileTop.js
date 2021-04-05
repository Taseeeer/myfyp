import React, { Fragment, useEffect } from "react";
import {connect} from "react-redux";

const ProfileTop = (props) => {
   return(
       <Fragment>
       <div>
         <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src={props.profile.profile.avatar}
            alt=""
          />
          <h1 class="large">{props.profile.profile.user.name}</h1>
          <p class="lead">
          {props.profile.profile.status}
          	&nbsp;at&nbsp;
          {props.profile.profile.company}
          </p>
          <p>{props.profile.profile.location}</p>
          <div class="icons my-1">
            {props.profile.profile.webiste &&
            (<a href={props.profile.profile.webstie} target="_blank" rel="noopener noreferrer">
              <i class="fas fa-globe fa-2x"></i>
            </a>)
            }
            {props.profile.profile.social.twitter && (
            <a href={props.profile.profile.social.twitter} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter fa-2x">
              </i>
            </a>
            )}
            {props.profile.profile.social.facebook && (
            <a href={props.profile.profile.social.facebook} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook fa-2x">
              </i>
            </a>
            )}
            {props.profile.profile.social.youtube && (
            <a href={props.profile.profile.social.youtube} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-youtube fa-2x">
              </i>
            </a>
            )}
            {props.profile.profile.social.instagram && (
            <a href={props.profile.profile.social.instagram} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram fa-2x">
              </i>
            </a>
            )}
          </div>
          </div>
       </div>
       </Fragment>
    );
};

export default ProfileTop;