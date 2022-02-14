import fs from "fs"
import path from "path"

import { connectMongoDB, getDocument, insertDocument } from "../../../data/mongoDb"

export default async function handler(req, res) {
    if (req.method === "GET") {
        let client;

        try {
            client = await connectMongoDB()
        } catch (error) {
            res.status(500).json({ message: "Failed to connect MongoDB. Error: " + error })
            return
        }

        let emails;
        try {
            emails = await getDocument(client, "emails")
        } catch (error) {
            res.status(500).json({ message: "Failed to get Documents. Error: " + error })
            return
        }

        res.status(200).json({ emails: emails })
    } else if (req.method === "POST") {

        const email = req.body.email

        if (!email || !email.includes("@")) {
            res.status(422).json({ message: "Invalid email address." })
            return
        }

        let client;

        try {
            client = await connectMongoDB()
        } catch (error) {
            res.status(500).json({ message: "Failed to connect MongoDB. Error: " + error })
            return
        }

        try {
            await insertDocument(client, "newsletter", { email: email })
        } catch (error) {
            res.status(500).json({ message: "Failed to insert Document. Error: " + error })
            return
        }

        res.status(201).json({ message: "success" })
    } else {
        res.status(404).json({ message: "404" })
    }
}