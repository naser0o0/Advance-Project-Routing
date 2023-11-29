import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

// Dieser Code ruft mithilfe des useParams-Hooks den Parameter „eventId“
// von der URL ab und zeigt ihn auf der Seite an. Die Kommentare erläutern den Zweck des useParams-Hooks
// und die Anzeige der eventId.

export default function EventDetailPage() {
  // const params = useParams();
  const data = useRouteLoaderData("event-detail");
  // console.log('data : ' , data);
  const event = data.event;
  // console.log(event);
  return (
    <>
      {/* <h1>Event Detail Page</h1> */}
      {/* was ich in root  (path: ":eventId") in App.js geschrieben habe muss ich in (params.eventId) schreiben. */}
      {/* <p>Event ID: {params.eventId}</p> */}
      <EventItem event={event} />
    </>
  );
}

export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);
  // console.log(response);
  if (!response.ok) {
    throw json({ message: "Could not fetch details for selected event." }, {
      status: 500
    });
  } else {
    return response;
  }
}


export async function action({params, request}){
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });
   if (!response.ok) {
    throw json({ message: "Could not delete event." }, {
      status: 500
    });
}else {
    return redirect('/events');
  }
  }