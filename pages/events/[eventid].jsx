import { Fragment } from "react"
import Head from "next/head"

import { getEventById, getFeaturedEvents } from "../../data/EventsData"

import { getCommentData, buildCommentPath } from "../api/comment"

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
            <Comments comments={comments} eventId={event.id} />
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const { params } = context
    const eventId = params.eventid
    const event = await getEventById(eventId)

    const path = buildCommentPath()
    const comments = getCommentData(path)

    if (!event) {
        return { notFound: true }
    }

    return {
        props: {
            event: event,
            comments: comments,
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents()
    const ids = events.map(event => event.id)

    const pathWithParams = ids.map(id => {
        return { params: { eventid: id } }
    })

    return {
        paths: pathWithParams,
        fallback: "blocking"
    }
}