import EventList from "../components/events/EventList.jsx"
import { getFeaturedEvents } from "../data/dummy-data.js"

export default function HomePage() {
  const featuredEvents = getFeaturedEvents()

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}
