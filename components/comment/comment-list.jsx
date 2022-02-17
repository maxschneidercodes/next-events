import classes from './comment-list.module.css';

export default function CommentList(props) {
    const { comments } = props

    if (!comments) {
        return null
    }
    console.log(comments)
    const commentsHmtl = comments.map(comment => {
        return <div key={comment.name} >
            <li>
                <p>{comment.comment}</p>
                <div>
                    By <address>{comment.name} on {comment.date}</address>
                </div>
            </li>
        </div >
    })

    return (
        <ul className={classes.comments}>
            {commentsHmtl}
        </ul>
    );
}
