const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let workouts = [];


app.get("/workouts", (req, res) => {
  res.json(workouts);
});


app.post("/workouts", (req, res) => {
  const workout = req.body;
  workouts.push(workout);
  res.json(workout);
});


app.delete("/workouts/:index", (req, res) => {
  const index = req.params.index;
  workouts.splice(index, 1);
  res.send("Deleted");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});