import { Fragment, useEffect, useState } from "react"
import EventList from "../../components/events/EventList"
import ResultsTitle from "../../components/events/results-title"
import CustomButton from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"
import { eventsDataUrl } from "../../data/EventsData"
import { useRouter } from "next/router"

export default function FilteredEventsPage() {
    const router = useRouter()
    const filterData = router.query.slug
    const [loadedEvents, setLoadedEvents] = useState()

    useEffect(() => {
        fetch(eventsDataUrl)
            .then(res => res.json())
            .then(data => {
                setLoadedEvents(data)
            })
    }, [])

    if (!loadedEvents) {
        return <div className="center">
            <span>Loading...</span>
        </div>
    }

    const filteredYear = filterData[0]
    const filteredMonth = filterData[1]

    const numYear = +filteredYear
    const numMonth = +filteredMonth

    if (isNaN(numYear) || isNaN(numMonth)) {
        return <div className="center" style={{ "marginTop": "2rem" }} >
            <ErrorAlert>Search Querry Error</ErrorAlert>
            <CustomButton link="/events">All Events</CustomButton>
        </ div>
    }

    let filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear
            && eventDate.getMonth() === numMonth - 1;
    });

    if (isNaN(numYear) || isNaN(numMonth) || filteredEvents.length === 0) {
        return <div className="center" style={{ "marginTop": "2rem" }} >
            <ErrorAlert>No Events found.
            </ErrorAlert>
            <CustomButton link="/events">All Events</CustomButton>
        </ div>
    }

    const date = new Date(numYear, numMonth - 1)

    return <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
    </Fragment>
}