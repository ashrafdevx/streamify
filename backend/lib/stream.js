import { configDotenv } from "dotenv";
import { StreamChat } from "stream-chat";

configDotenv();
const apiKey = process.env.STREAM_API_KEY;
const apiSecrete = process.env.STREAM_SECRETE;
const streamClient = StreamChat.getInstance(apiKey, apiSecrete);

export const upsertStreamUser = async (user) => {
  try {
    await streamClient.upsertUser(user);
    return user;
  } catch (error) {
    console.error("UpsertStream User error", error.message);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("generate Stream token ", error.message);
  }
};
