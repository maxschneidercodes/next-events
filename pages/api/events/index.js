import { getAllEvents } from "../../../data/EventsData"


export default async function handler(req, res) {
    if (req.method === "GET") {
        const events = await getAllEvents()
        res.status(200).json({ events: events })
    }
}