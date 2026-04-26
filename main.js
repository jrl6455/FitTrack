let chartData = [];

window.onload = function () {
  loadWorkouts();

  let ctx = document.getElementById('myChart').getContext('2d');

  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Workout Progress',
        data: []
      }]
    }
  });
};

async function addWorkout() {
  let exercise = document.getElementById("exercise").value;
  let sets = document.getElementById("sets").value;
  let reps = document.getElementById("reps").value;

  if (exercise === "" || sets === "" || reps === "") {
    alert("Please fill in all fields");
    return;
  }

  let workout = { exercise, sets, reps };

  await fetch("http://localhost:3000/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(workout)
  });

  loadWorkouts();
}

async function loadWorkouts() {
  let res = await fetch("http://localhost:3000/workouts");
  let data = await res.json();

  let list = document.getElementById("workoutList");
  list.innerHTML = "";

  let counter = 0;
  chartData = [];

  myChart.data.labels = [];
  myChart.data.datasets[0].data = [];

  data.forEach((w, index) => {
    let item = document.createElement("li");

    item.innerHTML = `
      ${w.exercise} - ${w.sets} x ${w.reps}
      <button onclick="deleteWorkout(${index})" class="btn btn-danger btn-sm">Delete</button>
    `;

    list.appendChild(item);

    counter++;
    chartData.push(Number(w.sets));
  });

  document.getElementById("counter").textContent = counter;

  chartData.forEach((value, i) => {
    myChart.data.labels.push("Workout " + (i + 1));
    myChart.data.datasets[0].data.push(value);
  });

  myChart.update();
}

async function deleteWorkout(index) {
  await fetch(`http://localhost:3000/workouts/${index}`, {
    method: "DELETE"
  });

  loadWorkouts();
}
