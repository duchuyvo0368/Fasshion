import React from 'react';
import { Link } from 'react-router-dom';

function HomeBlogItem(props) {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="single-blog">
                <div className="thumb">
                    <img style={{width:'350px', height:'243px', objectFit:'cover', cursor:'pointer'}} className="img-fluid" src={props.data.image} alt="" />
                </div>
                <div className="short_details">
                    <div className="meta-top d-flex">
                        <a >{props.data.userData.firstName +" "+props.data.userData.lastName}</a>
                        <a ><i className="ti-comments-smiley" />{props.data.commentData.length} Bình luận</a>
                    </div>
                    <Link className="d-block" to={`/blog-detail/${props.data.id}`}>
                        <h4>{props.data.title}</h4>
                    </Link>
                    <div className="text-wrap">
                        <p>
                            {props.data.description}
                        </p>
                    </div>
                    <a  className="blog_btn">Xem thêm<span className="ml-2 ti-arrow-right" /></a>
                </div>
            </div>
        </div>
    );
}

export default HomeBlogItem;