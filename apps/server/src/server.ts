import dotenv from "dotenv";
import app from "./app";
import aegisLog from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  aegisLog();
});
