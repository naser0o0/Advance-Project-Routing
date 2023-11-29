import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEvent() {
  const data = useRouteLoaderData("event-detail");
  // console.log(data);
  const event = data.event;
  return (
    <EventForm event={event} method='patch' />
  )
}
