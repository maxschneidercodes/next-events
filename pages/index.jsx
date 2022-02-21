import Head from "next/head"
import EventList from "../components/events/EventList.jsx"
import { getFeaturedEvents } from "../data/EventsData.js"
import NewsletterRegistration from "../components/newsletter/newsletter-registration"

export default function HomePage(props) {
  const { events } = props
  return (
    <div>
      <Head>
        <title>NextJS Events-App</title>
        <meta name="description" content="Google Crawler will see this text in Google Search." />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
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
