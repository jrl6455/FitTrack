function addWorkout() {
  let exercise = document.getElementById("exercise").value;
  let sets = document.getElementById("sets").value;
  let reps = document.getElementById("reps").value;

  if (exercise === "" || sets === "" || reps === "") {
    alert("Please fill in all fields");
    return;
  }

  let list = document.getElementById("workoutList");

  let item = document.createElement("li");
  item.textContent = exercise + " - " + sets + " sets x " + reps + " reps";

  list.appendChild(item);

  // clear inputs
  document.getElementById("exercise").value = "";
  document.getElementById("sets").value = "";
  document.getElementById("reps").value = "";
}
let count = 0;

function addWorkout() {
  let exercise = document.getElementById("exercise").value;
  let sets = document.getElementById("sets").value;
  let reps = document.getElementById("reps").value;

  if (exercise === "" || sets === "" || reps === "") {
    alert("Please fill in all fields");
    return;
  }

  let list = document.getElementById("workoutList");

  let item = document.createElement("li");
  item.textContent = exercise + " - " + sets + " x " + reps;

  list.appendChild(item);

  count++;
  document.getElementById("counter").textContent = count;

  document.getElementById("exercise").value = "";
  document.getElementById("sets").value = "";
  document.getElementById("reps").value = "";
}
