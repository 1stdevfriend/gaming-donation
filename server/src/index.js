import { PORT } from "./config.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(PORT || 8085, () => {
      console.log(`Server is listening on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!!", error);
    process.exit(1);
  });
