import { Fragment } from "react"
import Head from "next/head"

import { getCommentsById, getEventById, getFeaturedEvents } from "../../data/EventsData"

import EventSummery from "../../components/events/event-detail/event-summary"
import EventLogistics from "../../components/events/event-detail/event-logistics"
import EventConent from "../../components/events/event-detail/event-content"
import Comments from "../../components/comment/comments"

export default function EventDetailsPage(props) {
    const { event, comments } = props

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
            <EventSummery title={event.title} />
            <EventLogistics item={event} />
            <EventConent>
                {event.description}
            </EventConent>
            <Comments eventId={event._id} comments={comments} />
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const { params } = context
    const eventId = params.eventid
    const event = await getEventById(eventId)
    const comments = await getCommentsById(eventId)

    if (!event) {
        return { notFound: true }
    }

    return {
        props: {
            event: event,
            comments: comments
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents()
    const ids = events.map(event => event._id)

    const pathWithParams = ids.map(id => {
        return { params: { eventid: id } }
    })

    return {
        paths: pathWithParams,
        fallback: "blocking"
    }
}