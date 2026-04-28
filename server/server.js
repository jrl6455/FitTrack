const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());



mongoose.connect("mongodb+srv://jrl6455_db_user:fittrack123@cluster0.bsloobs.mongodb.net/fittrack?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));



const workoutSchema = new mongoose.Schema({
  exercise: String,
  sets: String,
  reps: String,
  weight: String,
  type: String,
  notes: String
});

const Workout = mongoose.model("Workout", workoutSchema);



app.get("/workouts", async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});


app.post("/workouts", async (req, res) => {
  const newWorkout = new Workout(req.body);
  await newWorkout.save();
  res.json(newWorkout);
});


app.delete("/workouts/:id", async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});