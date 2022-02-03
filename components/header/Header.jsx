import classes from "../header/header.module.css"
import Link from "next/link"
export default function Header() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href="/">NextJS Events App</Link>
            </div>
            <nav className={classes.navigation}>
                <li>
                    <Link href="/events"><a className={classes.navigation}>Browse All Events</a></Link>
                </li>
            </nav>
        </header>
    )
}