import { useLoaderData, json } from 'react-router-dom';
import EventList from '../components/EventsList';




export default function EventsPage() {
  const data = useLoaderData();
  // console.log('data: ' , data);
  const events = data.events;
  // console.log(events);
  return <EventList events={events} />;
}


export async function loader(){
  const response = await fetch('http://localhost:8080/events');


  if(!response.ok){
    // return {isError: true, message: 'Could not fetch events'};
    // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {
    //   status: 500,
    // });
    return json({ message: "Could not fetch events." },
    {
      status: 500,
    });
  } else {
    // const resData = await response.json();
    // return resData.events;
    return response;
  }
}