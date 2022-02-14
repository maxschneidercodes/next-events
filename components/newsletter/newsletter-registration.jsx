import { useState } from 'react';
import { useRef } from 'react';

import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
    const emailRef = useRef()
    const [success, setSuccess] = useState(false)

    function registrationHandler(event) {
        event.preventDefault();

        const email = emailRef.current.value
        const newsletterData = { email: email }
        fetch("/api/newsletter", {
            method: "POST",
            body: JSON.stringify(newsletterData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                if (data.message == "success") {
                    setSuccess(true)
                }
            })
    }

    return (
        <div>
            {
                success ? null : <section className={classes.newsletter}>
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