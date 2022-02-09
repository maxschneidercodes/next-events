import { Fragment, useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"

export default function Feedback() {

    const emailRef = useRef()
    const feedBackRef = useRef()
    const [success, setSuccess] = useState(false)
    const [feedBacks, setFeedbacks] = useState([])

    function fetchFeedBacks() {
        fetch("api/feedback")
            .then(res => res.json())
            .then(data => {
                setFeedbacks(data)
            })
    }

    useEffect(() => {
        fetchFeedBacks()
    }, [])

    function postFeedBack(reqBody) {
        fetch("/api/feedback", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.message == "success") {
                    setSuccess(true)
                }
            })
    }


    function sendFeedback(event) {
        event.preventDefault()

        const email = emailRef.current.value
        const feedBackText = feedBackRef.current.value

        let reqBody = { email: email, text: feedBackText }

        postFeedBack(reqBody)
    }

    if (success) {
        const html = feedBacks.feedback.map(item => {
            return <div>
                <h2>{item.email}</h2>
                <p>{item.text}</p>
            </div>
        })

        return <div>
            <h2>All Recent Feedbacks</h2>
            {
                html
            }
        </div>
    }



    return (
        <div className="center">
            <h2>Send us your feedback.</h2>
            <form onSubmit={sendFeedback}>
                <div>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" ref={emailRef}></input>
                </div>
                <div>
                    <label htmlFor="feedback">Your Feedback</label>
                    <textarea type="text" id="email" rows="5" ref={feedBackRef}></textarea>
                </div>
                <button>send</button>
            </form>
        </div>
    )
}
