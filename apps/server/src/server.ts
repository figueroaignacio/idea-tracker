import dotenv from "dotenv";
import { App } from "./app";
import aegisLog from "./utils/logger";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const server = new App(PORT);

server.listen();
aegisLog();
