import { ObjectId } from "mongodb"
import { addEmail } from "../../../data/NewsletterData"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const email = req.body.email
        addEmail({ _id: ObjectId(), email: email })
        res.status(201).json({ message: "success" })
    }
}