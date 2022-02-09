import { resolveNaptr } from "dns"
import fs from "fs"
import path from "path"

function handler(req, res) {

    if (req.method === "GET") {

        const filePath = path.join(process.cwd(), "data", "feedbackData.json")
        const fileData = fs.readFileSync(filePath)
        const data = JSON.parse(fileData)
        res.status(200).json({ message: "success", feedback: data })

    } else if (req.method === "POST") {
        const email = req.body.email
        const feedbackText = req.body.text

        let feedBack = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText
        }

        const filePath = path.join(process.cwd(), "data", "feedbackData.json")
        const fileData = fs.readFileSync(filePath)
        const data = JSON.parse(fileData)
        data.push(feedBack)
        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(201).json({ message: "success", feedback: feedBack })
    } else {
        res.status(200).json(false)
    }
}

export default handler