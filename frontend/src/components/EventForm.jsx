import { Form, useActionData, useNavigate, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;


// request ist  ein Objekt, das Informationen über die HTTP-Anfrage enthält, die vom Client gesendet wurde.
// formData zu repräsentieren, das häufig für das Senden von Dateien über HTTP verwendet wird.
export async function action ({ request, params }) {
  // try {
    const method = request.method;
    const data = await request.formData();

    const eventData = {
      title: data.get("title"),
      image: data.get("image"),
      date: data.get("date"),
      // date: new Date(data.get("date")).toISOString(),
      description: data.get("description"),
    };

     let url = "http://localhost:8080/events";

     if (method === "PATCH") {
       const eventId = params.eventId;
       url = "http://localhost:8080/events/" + eventId;
     }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw json({ message: "Could not save event." }, { status: 500 });
    }
  //   if (!response.ok) {
  //     const errorMessage = await response.text();
  //     throw new Error(`Could not save event. Server response: ${errorMessage}`);
  //   }
  // } catch (error) {
  //   console.error("Error:", error);
  //   throw new Error("Internal Server Error");
  // }
  return redirect('/events');
}
