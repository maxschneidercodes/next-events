import { useState } from 'react';
import { useRef } from 'react';

import classes from './newsletter-registration.module.css';

import { useContext } from "react"
import { Context } from '../../store/notification-context';

function NewsletterRegistration() {

    const { showNotificationHandler, succesNewsletter, setSuccesNewsletter } = useContext(Context)
    const emailRef = useRef()

    function registrationHandler(event) {
        event.preventDefault();

        const email = emailRef.current.value
        const newsletterData = { email: email }

        showNotificationHandler({
            title: "Pending..",
            message: "Sining up",
            status: "pending"
        })

        fetch("/api/newsletter", {
            method: "POST",
            body: JSON.stringify(newsletterData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setSuccesNewsletter(true)
                showNotificationHandler({
                    title: "Success",
                    message: "Success sining up",
                    status: "success"
                })
            }).catch((error) => {
                showNotificationHandler({
                    title: "Error",
                    message: error,
                    status: "error"
                })
            })
    }

    return (
        <div>
            {
                succesNewsletter ? null : <section className={classes.newsletter}>
                    <h2>Sign up to stay updated!</h2>
                    <form onSubmit={registrationHandler}>
                        <div className={classes.control}>
                            <input ref={emailRef}
                                type='email'
                                id='email'
                                placeholder='Your email'
                                aria-label='Your email'
                            />
                            <button>Register</button>
                        </div>
                    </form>
                </section>
            }
        </div>
    );
}

export default NewsletterRegistration;