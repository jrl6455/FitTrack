let count = 0;
let chartData = [];
let workouts = [];

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


  workouts.forEach(w => {
    chartData.push(Number(w.sets));
    updateChart();
  });
};

function addWorkout() {
  let exercise = document.getElementById("exercise").value;
  let sets = document.getElementById("sets").value;
  let reps = document.getElementById("reps").value;

  if (exercise === "" || sets === "" || reps === "") {
    alert("Please fill in all fields");
    return;
  }

  let workout = { exercise, sets, reps };
  workouts.push(workout);

  saveWorkouts();

  displayWorkout(workout);

  count++;
  document.getElementById("counter").textContent = count;

  chartData.push(Number(sets));
  updateChart();

  document.getElementById("exercise").value = "";
  document.getElementById("sets").value = "";
  document.getElementById("reps").value = "";
}

function displayWorkout(workout, index) {
  let list = document.getElementById("workoutList");

  let item = document.createElement("li");
  item.className = "d-flex justify-content-between align-items-center";

  item.innerHTML = `
    <span>${workout.exercise} - ${workout.sets} x ${workout.reps}</span>
    <button class="btn btn-danger btn-sm">Delete</button>
  `;

  
  let btn = item.querySelector("button");
  btn.onclick = function () {
    deleteWorkout(index);
  };

  list.appendChild(item);
}

function deleteWorkout(index) {
  workouts.splice(index, 1); 

  saveWorkouts(); 

  refreshUI(); 
}

function refreshUI() {
  let list = document.getElementById("workoutList");
  list.innerHTML = "";

  count = 0;
  chartData = [];

  myChart.data.labels = [];
  myChart.data.datasets[0].data = [];
  myChart.update();

  workouts.forEach((w, i) => {
    displayWorkout(w, i);
    count++;
    chartData.push(Number(w.sets));
    updateChart();
  });

  document.getElementById("counter").textContent = count;
}

function saveWorkouts() {
  localStorage.setItem("workouts", JSON.stringify(workouts));
}

function loadWorkouts() {
  let saved = localStorage.getItem("workouts");

  if (saved) {
    workouts = JSON.parse(saved);

    workouts.forEach(w => {
      displayWorkout(w);
      count++;
    });

    document.getElementById("counter").textContent = count;
  }
}

function updateChart() {
  myChart.data.labels.push("Workout " + chartData.length);
  myChart.data.datasets[0].data = chartData;
  myChart.update();
}
