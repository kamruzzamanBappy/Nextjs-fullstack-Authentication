import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo DB Connected Successful");
    });

    connection.on("error", (err) => {
      console.log(
        "Mongo DB connection error,Please make sure MongoDB is running" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes to wrong");
    console.log(error);
  }
}
