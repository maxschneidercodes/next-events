import EventItem from "./EventItem"

import classes from "../events/EventList.module.css"

export default function EventList(props) {
    const { items } = props

    const listItems = items.map((item) => {
        return <EventItem key={item._id} item={item} />
    })

    return (
        <ul className={classes.list}>
            {listItems}
        </ul>
    )
}