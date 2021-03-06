import { Fragment } from "react"
import { useRouter } from "next/router"

import EventsSearch from "../../components/events/EventsSearch"
import { getAllEvents } from "../../data/EventsData"
import EventList from "../../components/events/EventList"

export default function EventsPage(props) {
    const router = useRouter()
    const { events } = props

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

export async function getStaticProps() {

    const events = await getAllEvents()

    if (!events) {
        return { notFound: true }
    }

    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}
