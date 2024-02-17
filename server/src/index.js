import { app } from "./app.js";
import connectDB from "./db/connectDB.js";

connectDB()
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`server is active on port ${process.env.PORT}`);
    })
  )
  .catch((error) =>
    console.log(
      `something went wrong while starting a server at port : ${process.env.PORT}`
    )
  );