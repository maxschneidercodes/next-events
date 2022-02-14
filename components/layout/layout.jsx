import { Fragment, useContext } from "react";

import Footer from "../footer/Footer";
import Header from "../header/Header";

import Notification from "../ui/notification"
import { Context } from "../../store/notification-context";

export default function Layout(props) {
    const { activeNotification } = useContext(Context)

    return <Fragment>
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </div>
        {activeNotification && <Notification
            title={activeNotification.title}
            message={activeNotification.message}
            status={activeNotification.status} />}
    </Fragment>
}