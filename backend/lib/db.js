import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
configDotenv();
const ConnectDB = () => {
  dns.lookup("googlecom", async (err) => {
    try {
      const URI = err ? process.env.LOCAL_DB : process.env.CLOUD_DB;
      await mongoose.connect(URI);
      console.log(`${err ? "Local DB" : "Cloud DB"} Connected!!`);
    } catch (error) {
      console.log("DB Error", error.message);
    }
  });
};

export default ConnectDB;
