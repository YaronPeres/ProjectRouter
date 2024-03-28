//first step
// import React from "react";
// import { Link } from "react-router-dom";
// //dummy data to mimic real fetching data
// const EVENTS = [
//   { id: "p1", title: "Product 1" },
//   { id: "p2", title: "Product 2" },
//   { id: "p3", title: "Product 3" },
// ];
// function EventsPage() {
//   return (
//     <>
//       <h1>Events</h1>
//       <ul>
//         {EVENTS.map((event) => (
//           <li key={event.id}>
//             <Link to={event.id}>{event.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default EventsPage;
import { useEffect, useState } from "react";

import EventsList from "../components/EventsList";

function EventsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/events");

      if (!response.ok) {
        setError("Fetching events failed.");
      } else {
        const resData = await response.json();
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
}

export default EventsPage;
