import { Fragment } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

export default function Layout(props) {
    return <Fragment>
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </div>
    </Fragment>
}