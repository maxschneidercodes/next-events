import Head from "next/head"
import { useEffect } from "react"

import EventList from "../components/events/EventList.jsx"
import { getFeaturedEvents } from "../data/EventsData.js"

export default function HomePage(props) {

  return (
    <div>
      <Head>
        <title>NextJS Events-App</title>
        <meta name="description" content="Google Crawler will see this text in Google Search." />
      </Head>
      <EventList items={props.events} />
    </div>
  )
}

export async function getStaticProps() {
  const events = await getFeaturedEvents()
  return {
    props: {
      events: events
    }, revalidate: 600
  }
}
