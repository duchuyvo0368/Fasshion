import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

function PopularItemBlog(props) {
    return (
        <div className="media post_item">
            <img style={{width:'80px', height:'80px', objectFit:'cover', borderRadius:'5px'}} src={props.data.image} alt="post" />
            <div className="media-body">
                <Link to={`/blog-detail/${props.data.id}`}>
                    <h3>{props.data.title}</h3>
                </Link>
                <p>{moment(props.createdAt).format("DD/MM/YYYY HH:mm")}</p>
            </div>
        </div>
    );
}

export default PopularItemBlog;