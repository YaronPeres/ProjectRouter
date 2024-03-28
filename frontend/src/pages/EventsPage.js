import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

function EventsPage() {
  // loader cant be used on higher lvl than im fetching the data (only same lvl or below(children))
  // const data = useLoaderData();
  const { events } = useLoaderData();
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // const events = data.events;
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
    // <>
    //   <EventsList events={events} />
    // </>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events." };
    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // });
    return json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
    // return response;
  }
}
export function loader() {
  //defer helps with loading part of the component while waiting the loading of the rest of the component
  // to defer we pass an object
  return defer({
    events: loadEvents(),
  });
}
