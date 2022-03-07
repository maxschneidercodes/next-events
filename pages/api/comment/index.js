import { addComment } from "../../../data/EventsData"


export default async function handler(req, res) {

    if (req.method === "POST") {

        const commentText = req.body.text
        const eventID = req.body.eventId
        const name = req.body.name
        const email = req.body.email

        let comment = {
            comment: commentText,
            date: new Date().toDateString(),
            name: name,
            email: email
        }

        try {
            addComment(comment, eventID)
            res.status(201).json({ message: "success" })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}