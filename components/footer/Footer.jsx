import classes from "../footer/Footer.module.css"
import NewsletterRegistration from "../newsletter/newsletter-registration"

export default function Footer() {
    return (
        <div className={classes.footer}>
            <NewsletterRegistration />
        </div>
    )
}