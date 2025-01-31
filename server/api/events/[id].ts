import Event from "~/server/models/Events";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const id = getRouterParam(event, "id");

  if (method === "GET") {
    try {
      const singleEvent = await Event.findById(id);
      if (!singleEvent)
        throw createError({
          statusCode: 404,
          statusMessage: "Event not found",
        });
      return singleEvent;
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error fetching event",
      });
    }
  }

  if (method === "PUT") {
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

  if (method === "DELETE") {
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
