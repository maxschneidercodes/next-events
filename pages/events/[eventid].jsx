import { useRouter } from "next/router"
import { Fragment } from "react"

import { getEventById } from "../../data/dummy-data"

import EventSummery from "../../components/events/event-detail/event-summary"
import EventLogistics from "../../components/events/event-detail/event-logistics"
import EventConent from "../../components/events/event-detail/event-content"

export default function EventDetailsPage() {
    const route = useRouter()
    const eventID = route.query.eventid
    const event = getEventById(eventID)
    console.log(event)
    if (!event) {
        return <p>No event found with that Id</p>
    }

    return (
        <Fragment>
            <EventSummery title={event.title} />
            <EventLogistics item={event} />
            <EventConent>
                {event.description}
            </EventConent>
        </Fragment>
    )
}
