let workouts = [];
let chartData = [];
let count = 0;


window.onload = function () {
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

  loadWorkouts();
};


function addWorkout() {
  let exercise = document.getElementById("exercise").value;
  let sets = document.getElementById("sets").value;
  let reps = document.getElementById("reps").value;

  if (exercise === "" || sets === "" || reps === "") {
    alert("Please fill in all fields");
    return;
  }

  let workout = {
    exercise,
    sets: Number(sets),
    reps: Number(reps)
  };

  workouts.push(workout);

  localStorage.setItem("workouts", JSON.stringify(workouts));

  loadWorkouts();


  document.getElementById("exercise").value = "";
  document.getElementById("sets").value = "";
  document.getElementById("reps").value = "";
}


function loadWorkouts() {
  let saved = localStorage.getItem("workouts");

  workouts = saved ? JSON.parse(saved) : [];

  let list = document.getElementById("workoutList");
  list.innerHTML = "";

  count = 0;
  chartData = [];


  myChart.data.labels = [];
  myChart.data.datasets[0].data = [];

  workouts.forEach((w, i) => {
    // display workout
    let item = document.createElement("li");
    item.className = "d-flex justify-content-between align-items-center";

    item.innerHTML = `
      <span>${w.exercise} - ${w.sets} x ${w.reps}</span>
      <button class="btn btn-danger btn-sm" onclick="deleteWorkout(${i})">Delete</button>
    `;

    list.appendChild(item);


    count++;

 
    chartData.push(w.sets);
    myChart.data.labels.push("Workout " + (i + 1));
  });

  myChart.data.datasets[0].data = chartData;
  myChart.update();

  document.getElementById("counter").textContent = count;
}

function deleteWorkout(index) {
  workouts.splice(index, 1);

  localStorage.setItem("workouts", JSON.stringify(workouts));

  loadWorkouts();
}
