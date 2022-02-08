export async function getAllEvents() {
    const res = await fetch("https://events-app-f18fb-default-rtdb.europe-west1.firebasedatabase.app/events.json")
    const events = await res.json()
    return events
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
    return events.find((event) => event.id === id);
}