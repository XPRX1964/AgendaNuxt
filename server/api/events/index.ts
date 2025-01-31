import Event from "~/server/models/Events";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "GET") {
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
});
