import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {

    const [formData, setFromData] = useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        bio: "",
        twitter: "",
        facebook: "",
        instagram: "",
    });

    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        twitter,
        facebook,
        instagram
    } = formData;


    const [displaySocials, setDisplaySocials] = useState(false); 
    
    const onChange = e => setFromData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        createProfile(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> 
                 Inforamtion to make your Profile stand out.
            </p>
            <small>Required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <select name="status" value={status} onChange={e => onChange(e)}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text"
                    >Where're you in your career</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)}/>
                <small className="form-text"
                    >Could be your own Start-Up or one you work for?</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)}/>
                <small className="form-text"
                    >Your own company or website</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                <small className="form-text"
                    >City?</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)}/>
                <small className="form-text"
                    >Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small
                >
                </div>
                <div className="form-group">
                {/* <input
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                    value={githubusername} onChange={e => onChange(e)}
                /> */}
                {/* <small className="form-text"
                    >If you want your latest repos and a Github link, include your
                    username</small
                > */}
                </div>
                <div className="form-group">
                <textarea placeholder="A short bio of yours" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                <button onClick={() => setDisplaySocials(!displaySocials)} type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
                </div>

                {
                    displaySocials && 
                    <Fragment>
                        <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)}/>
                        </div>

                        <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
                        </div>

                        <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}/>
                        </div>
                    </Fragment>
                }
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    );
};


export default connect(null,{ createProfile })(withRouter(CreateProfile));