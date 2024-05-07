import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

function ItemBlog(props) {
    return (
        <article className="blog_item">
            <div  className="blog_item_img">
                <img style={{height:'514px', objectFit:'cover'}} className="card-img rounded-0" src={props.data.image} alt="" />
                <a href="#" className="blog_item_date">
                    <h3>{moment(props.createdAt).format("DD")}</h3>
                    <p>{moment(props.createdAt).format("MMM")}</p>
                </a>
            </div>
            <div className="blog_details">
                <Link style={{color:'#797979', fontSize:'18px'}} className="d-inline-block" to={`/blog-detail/${props.data.id}`}>
                    <h2>{props.data.title}</h2>
                
                <p>{props.data.shortdescription}</p>
                <ul className="blog-info-link">
                    <li><i className="ti-user" /> {props.data.userData.firstName+" "+props.data.userData.lastName}</li>
                    <li><i className="ti-comments" /> {props.data.commentData.length} Bình luận</li>
                </ul>
                </Link>
            </div>
        </article>
    );
}

export default ItemBlog;