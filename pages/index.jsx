import EventList from "../components/events/EventList.jsx"
import { getFeaturedEvents } from "../data/EventsData.js"

export default function HomePage(props) {
  return (
    <div>
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
