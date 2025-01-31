import Event from "~/server/models/Events";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const context = event.context;
  const id = context.params?.id;

  // GET all events
  if (method === "GET" && !id) {
    try {
      const events = await Event.find().sort({ createdAt: -1 });
      return events;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error fetching events",
      });
    }
  }

  // GET single event
  if (method === "GET" && id) {
    try {
      const event = await Event.findById(id);
      if (!event)
        throw createError({
          statusCode: 404,
          statusMessage: "Event not found",
        });
      return event;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error fetching event",
      });
    }
  }

  // POST new event
  if (method === "POST") {
    try {
      const body = await readBody(event);
      const newEvent = await Event.create(body);
      return newEvent;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error creating event",
      });
    }
  }

  // PUT update event
  if (method === "PUT" && id) {
    try {
      const body = await readBody(event);
      const updatedEvent = await Event.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (!updatedEvent)
        throw createError({
          statusCode: 404,
          statusMessage: "Event not found",
        });
      return updatedEvent;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error updating event",
      });
    }
  }

  // DELETE event
  if (method === "DELETE" && id) {
    try {
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent)
        throw createError({
          statusCode: 404,
          statusMessage: "Event not found",
        });
      return { message: "Event deleted successfully" };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error deleting event",
      });
    }
  }
});
