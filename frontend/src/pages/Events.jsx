import { useLoaderData } from 'react-router-dom';
import EventList from '../components/EventsList';
export default function EventsPage() {
  const data = useLoaderData();
  const events = data.events;
  return <EventList events={events} />;
}


export async function loader(){
  const response = await fetch('http://localhost:8080/eventss');

  if(!response.ok){
    // return {isError: true, message: 'Could not fetch events'};
    throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {
      status: 500,
    });
  } else {
    // const resData = await response.json();
    // return resData.events;
    return response;
  }
}