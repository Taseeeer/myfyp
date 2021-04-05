import axios from "axios";
import { setAlert } from "./alert";

import {
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
} from "./types";


//to get a user

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/user/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
};

//getting all profiles
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});
    try {
        const res = await axios.get("/api/profile/");

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    }
    catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
};

//getting profile by id
export const getProfileById = (userId) => async dispatch => {
    
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
};


//create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.post("/api/profile", formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? "Profile Update" : "Profile Created", "success"));

        if(!edit){
            history.push("/dashboard");
        }

    }
    catch(err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));   
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
};


//for exp
export const addExperience = (formData, history) => async dispatch => {
    try {
    
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
    
        const res = await axios.put("/api/profile/experience", formData, config);
    
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
    
        dispatch(setAlert("Experience added", "success"));
        history.push("/dashboard");
    
    }
    catch(err) {
    
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));   
        }
    
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }

};

//for edu
export const addEducation = (formData, history) => async dispatch => {
    try {
    
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
    
        const res = await axios.put("/api/profile/education", formData, config);
    
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Education added", "success"));
        history.push("/dashboard");
    
    }
    catch(err) {
    
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));   
        }
    
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
};

//for deleting exp
export const deleteExperience = id => async dispatch => {
    try{
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Experience removed", "success"));

    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//for deleting edu
export const deleteEducation = id => async dispatch => {
    try{
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education removed", "success"));

    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//for deleting account 
export const deleteAccount = id => async dispatch => {

    if(window.confirm("Are you sure about this? This can't be undone!")){
        try{
        await axios.delete(`/api/profile/`);
        dispatch({
            type: CLEAR_PROFILE,
        });
        dispatch({
            type: ACCOUNT_DELETED
        });
        dispatch(setAlert("You account is perminently deleted!", "success"));
        
    } catch(err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
};