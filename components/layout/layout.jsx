import { Fragment } from "react";
import Header from "../header/Header";

export default function Layout(props) {
    return <Fragment>
        <Header />
        <main>
            {props.children}
        </main>
    </Fragment>
}