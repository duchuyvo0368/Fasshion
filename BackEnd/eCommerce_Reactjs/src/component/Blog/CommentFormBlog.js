import React, { useEffect, useState } from 'react';

function CommentFormBlog(props) {
    const[content,setcontent] = useState('')

    let handleAddComment = () =>{
        props.handleAddComment(content)
        setcontent('')
    }
    return (
        <div className="comment-form">
            <h4>Hãy để lại lời bình luận của bạn</h4>
            <form className="form-contact comment_form" action="#" id="commentForm">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <textarea value={content} onChange={(e) => setcontent(e.target.value)} className="form-control w-100" name="comment" id="comment" cols={30} rows={9} placeholder="Lời bình luận" defaultValue={""} />
                        </div>
                    </div>
                
                </div>
                <div className="form-group">
                    <button type='button' onClick={() => handleAddComment()} className="main_btn">Gửi lời bình luận</button>
                </div>
            </form>
        </div>
    );
}

export default CommentFormBlog;