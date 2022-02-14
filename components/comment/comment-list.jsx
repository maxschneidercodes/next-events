import classes from './comment-list.module.css';

export default function CommentList(props) {
    const { eventId, comments } = props

    if (!comments) {
        return null
    }

    const filteredComments = comments.filter(item => {
        return item.id === eventId
    })

    if (!filteredComments) {
        return null
    }

    let arr = []
    for (let i = 0; i < filteredComments.length; i++) {
        let html = <div key={filteredComments[i].id + i}>
            <li>
                <p>{filteredComments[i].text}</p>
                <div>
                    By <address>{filteredComments[i].name}</address>
                </div>
            </li>
        </div>
        arr.push(html)
    }

    return (
        <ul className={classes.comments}>
            {arr}
        </ul>
    );
}
