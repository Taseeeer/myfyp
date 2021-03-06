import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {connect} from "react-redux";


const PostItem = ({post, auth}) => {
    return (
        <Fragment>
            <div className="posts">
                <div class="post bg-white p-1 my-1">
                <div>
                    <a href="profile.html">
                    <img
                        class="round-img"
                        src="./img/meh.jpg"
                        alt=""
                    />
                    <h4>{post.name}</h4>
                    </a>
                </div>
                <div>
                    <p class="my-1">
                    {post.text}
                    </p>
                    <p class="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
                    </p>
                    <button type="button" class="btn btn-light">
                    <i class="fas fa-thumbs-up"></i> {" "}
                    <span>{post.likes.length > 0 && (
                    <span >{post.likes.length}</span>
                    )}</span>
                    </button>
                    <button type="button" class="btn btn-light">
                    <i class="fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/post/${post._id}`} class="btn btn-primary">
                    Discussion {post.comments.length > 0 && (
                    <span class='comment-count'>{post.comments.length}</span>
                    )} 
                    </Link>
                    {!auth.loading && post.user === auth.user._id && (
                        <button      
                        type="button"
                        class="btn btn-danger">
                        <i class="fas fa-times"></i>
                        </button>
                    )}
                </div>
                </div>               
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(PostItem);