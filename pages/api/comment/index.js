import fs from "fs"
import path from "path"

export function buildCommentPath() {
    return path.join(process.cwd(), "data", "commentData.json")
}

export function getCommentData(filePath) {
    const fileData = fs.readFileSync(filePath)
    return JSON.parse(fileData)
}

function handler(req, res) {
    if (req.method === "GET") {

        const filePath = buildCommentPath()
        const data = getCommentData(filePath)
        res.status(200).json({ message: "success", comments: data })

    } else if (req.method === "POST") {

        const eventId = req.body.eventId
        const email = req.body.email
        const name = req.body.name
        const feedbackText = req.body.text

        const comment = {
            id: eventId,
            email: email,
            name: name,
            text: feedbackText
        }

        const filePath = buildCommentPath()
        const data = getCommentData(filePath)
        data.push(comment)

        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(201).json({ message: "success", comment: comment })
    } else {
        res.status(200).json(false)
    }
}

export default handler