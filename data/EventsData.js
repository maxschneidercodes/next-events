import { getDocument, connectToDatabase, updateDocument } from "./mongoDb"

export async function getAllEvents() {
    const { client } = await connectToDatabase("events")
    const res = await getDocument(client, "events")
    const eventsJSON = JSON.stringify(res)
    const eventsArr = JSON.parse(eventsJSON)
    return eventsArr
}

export async function getFeaturedEvents() {
    const events = await getAllEvents()
    const filteredEvents = events.filter((event) => event.isFeatured);
    return filteredEvents
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const events = await getAllEvents()

    let filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}

export async function getEventById(id) {
    const events = await getAllEvents()

    return events.find((event) => event._id === id);
}

export async function getCommentsById(id) {
    const events = await getAllEvents()
    const event = events.find((event) => event._id === id)

    let comments = []
    if (!event.comments) { return [] }

    for (let i = 0; i < event.comments.length; i++) {
        const commentObjc = {
            name: event.comments[i].name,
            comment: event.comments[i].comment,
            email: event.comments[i].email,
            date: event.comments[i].date ? event.comments[i].date : ""
        }
        comments.push(commentObjc)
    }
    return comments
}

export async function addComment(comment, eventId) {
    const { client } = await connectToDatabase("events")
    await updateDocument(client, "events", comment, eventId)
}