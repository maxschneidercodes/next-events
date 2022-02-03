import classes from "../events/EventItem.module.css"
import CustomButton from "../ui/button"
import DateIcon from "../icons/date-icon"
import AddressIcon from "../icons/address-icon"
import ArrowRightIcon from "../icons/arrow-right-icon"

export default function EventItem(props) {
    const { item } = props

    const readableDate = new Date(item.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })
    const exploreLink = `events/${item.id}`

    return (
        <li className={classes.item}>
            <img src={'/' + item.image} alt={item.title} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{item.title}</h2>
                </div>
                <div className={classes.date}>
                    <DateIcon />
                    <time>{readableDate}</time>
                </div>
                <div className={classes.address}>
                    <AddressIcon />
                    <address>{item.location}</address>
                </div>
                <div className={classes.actions}>
                    <CustomButton link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}><ArrowRightIcon /></span>
                    </CustomButton>
                </div>
            </div>
        </li>
    )
}