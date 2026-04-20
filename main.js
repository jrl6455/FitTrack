let count = 0;
let chartData = [];


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
};

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


  chartData.push(Number(sets));
  updateChart();


  document.getElementById("exercise").value = "";
  document.getElementById("sets").value = "";
  document.getElementById("reps").value = "";
}

function updateChart() {
  myChart.data.labels.push("Workout " + chartData.length);
  myChart.data.datasets[0].data = chartData;
  myChart.update();
}

