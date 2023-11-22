import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";
export default function EventsRoot() {
  return (
    <>
      <h3>Events Root</h3>
      <EventsNavigation />
      <Outlet />
    </>
  );
}
