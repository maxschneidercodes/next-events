import { useRouter } from "next/router"
import { Fragment } from "react"
import EventList from "../../components/events/EventList"
import EventsSearch from "../../components/events/EventsSearch"
import { getFilteredEvents } from "../../data/dummy-data"
import ResultsTitle from "../../components/events/results-title"
import CustomButton from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"

export default function FilteredEventsPage() {
    const router = useRouter()

    const filteredData = router.query.slug
    if (!filteredData) { return <p>Loading...</p> }

    const numY = +filteredData[0]
    const numM = +filteredData[1]

    if (isNaN(numY) || isNaN(numM)) {
        return <Fragment>
            <div className="center">
                <ErrorAlert>Invalid Search Querry.</ErrorAlert>
                <CustomButton link="/events">Show All Events</CustomButton>
            </div>
        </Fragment>
    }

    const filterQuerry = { year: numY, month: numM }
    const filteredEvents = getFilteredEvents(filterQuerry)

    if (!filteredEvents || filteredEvents.length === 0) {
        return <div className="center">
            <div className="center">
                <ErrorAlert>No Events found.</ErrorAlert>
                <CustomButton link="/events">Show All Events</CustomButton>
            </div>
        </div>
    }

    const date = new Date(numY, numM - 1)

    return <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
    </Fragment>
}
