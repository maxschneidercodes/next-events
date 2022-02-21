import classes from "../footer/Footer.module.css"
import NewsletterRegistration from "../newsletter/newsletter-registration"

export default function Footer() {
    return (
        <div className={classes.footer}>
            <div className="center">
                <a href="https://github.com/maxschneidercodes">by maxschneidercodes</a>
            </div>
        </div>
    )
}