import { useState } from 'react';
import { useRouter } from "next/router"

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';


function Comments(props) {
    const { eventId, comments } = props;
    const router = useRouter()
    const [showComments, setShowComments] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setShowComments(true)
                router.push(`/events/${eventId}`)
            })
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment eventId={eventId} onAddComment={addCommentHandler} />}
            {showComments && <CommentList eventId={eventId} comments={comments} />}
        </section>
    );
}

export default Comments;