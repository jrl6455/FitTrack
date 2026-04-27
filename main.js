let currentFilter = "All";

function setFilter(type) {
  currentFilter = type;
  loadWorkouts();
}

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

 
  let weight = document.getElementById("weight").value;
  let type = document.getElementById("type").value;
  let notes = document.getElementById("notes").value;

  if (exercise === "" || sets === "" || reps === "") {
    alert("Please fill in all required fields");
    return;
  }

  
  let workout = {
    exercise,
    sets,
    reps,
    weight,
    type,
    notes
  };

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

  let filtered = data.filter((w) => {
  if (currentFilter === "All") return true;
  return w.type === currentFilter;
});

filtered.forEach((w, index) =>  {
  let item = document.createElement("li");
item.className = "list-group-item";

item.innerHTML = `
  <strong>${w.exercise}</strong> - ${w.sets} x ${w.reps} (${w.weight || "-"} lbs)
  
  <span class="badge bg-secondary ms-2">${w.type || "N/A"}</span>
  
  <button onclick="deleteWorkout(${index})" 
          class="btn btn-danger btn-sm float-end">
    Delete
  </button>

  <br>
  <small class="text-muted">${w.notes || ""}</small>
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
