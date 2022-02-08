import { Fragment } from "react"
import EventList from "../../components/events/EventList"
import ResultsTitle from "../../components/events/results-title"
import CustomButton from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"
import { getFilteredEvents } from "../../data/EventsData"

export default function FilteredEventsPage(props) {
    const { events, year, month, hasError } = props

    if (hasError) {
        return <p>Error</p>
    }

    const date = new Date(year, month - 1)

    return <Fragment>
        <ResultsTitle date={date} />
        <EventList items={events} />
    </Fragment>
}


//SERVER SIDE RENDERING
export async function getServerSideProps(context) {
    const { params, req, res } = context

    const filteredData = params.slug

    const filteredYear = filteredData[0]
    const filteredMonth = filteredData[1]

    const numYear = +filteredYear
    const numMonth = +filteredMonth

    if (isNaN(numYear) || isNaN(numMonth)) {
        return {
            props: { hasError: true }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    })

    return {
        props: {
            year: numYear,
            month: numMonth,
            events: filteredEvents
        }
    }
}