import { getCommentData, buildCommentPath } from "../comment/index";

export default function handler(req, res) {
    const id = req.query.feedbackid
    const filePath = buildCommentPath()
    const comments = getCommentData(filePath)
    const comment = comments.find((item) => item.id === id);
    res.status(200).json({ comment: comment })
}