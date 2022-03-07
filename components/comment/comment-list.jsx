import classes from './comment-list.module.css';

export default function CommentList(props) {
    const { comments } = props

    console.log(comments)

    if (!comments) {
        return null
    }

    const commentsHmtl = comments.map(comment => {

        console.log(comment.date)
        return <div key={comment.name} >
            <li>
                <p>{comment.comment}</p>
                <div>
                    By <address>{comment.name} posted at {comment.date}</address>
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
