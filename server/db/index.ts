import mongoose from "mongoose";
import { Nitro } from "nitropack";

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  if (!config.MONGODB_URI) {
    console.error(
      "MONGODB_URI is not defined. Check your .env file and nuxt.config.ts setup."
    );
    return;
  }

  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
