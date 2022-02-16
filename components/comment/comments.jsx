import { useState } from 'react';
import { useRouter } from "next/router"
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { useContext } from 'react';
import { Context } from '../../store/notification-context';
import { useEffect } from 'react';

function Comments(props) {
    const { eventId } = props;
    const router = useRouter()
    const [showComments, setShowComments] = useState(false);
    const { showNotificationHandler } = useContext(Context)
    const [comments, setComments] = useState([])
    const [loadingCommentsBanner, setLoadingCommentsBanner] = useState(false)

    useEffect(() => {
        setLoadingCommentsBanner(true)
        fetch("/api/comment").then(res => res.json())
            .then(data => {
                setLoadingCommentsBanner(false)
                setComments(data.comments)
            })
    }, [])

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        showNotificationHandler({
            title: "Pending",
            message: "Commenting..",
            status: "pending"
        })
        fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                if (!data) {
                    showNotificationHandler({
                        title: "Error",
                        message: "Error posting comment",
                        status: "error"
                    })
                } else {
                    setShowComments(true)
                    showNotificationHandler({
                        title: "Success",
                        message: "Succes commenting",
                        status: "success"
                    })
                    router.push(`/events/${eventId}`)
                }
            })
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment eventId={eventId} onAddComment={addCommentHandler} />}
            {showComments && loadingCommentsBanner && "Loading comments.."}
            {showComments && <CommentList eventId={eventId} comments={comments} />}
        </section>
    );
}

export default Comments;