import React from 'react';

function CommentBlog(props) {
    return (
        <div className="comment-list">
            <div className="single-comment justify-content-between d-flex">
                <div className="user justify-content-between d-flex">
                    <div className="thumb">
                        <img src={props.img} alt="" />
                    </div>
                    <div className="desc">
                        <p className="comment">
                           {props.content}
                        </p>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                <h5>
                                    <a >{props.name}</a>
                                </h5>
                                <p className="date">{props.date} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentBlog;