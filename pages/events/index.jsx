import { getAllEvents } from "../../data/dummy-data"
import EventList from "../../components/events/EventList"
import { Fragment } from "react"
import EventsSearch from "../../components/events/EventsSearch"
import { getFilteredEvents } from "../../data/dummy-data"
import { useRouter } from "next/router"

export default function EventsPage() {
    const events = getAllEvents()
    const router = useRouter()

    function findsEventsHandler(year, month) {
        const path = `/events/${year}/${month}`
        router.push(path)
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findsEventsHandler} />
            <EventList items={events} />
        </Fragment>
    )
}
