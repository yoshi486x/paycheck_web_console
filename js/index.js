window.onload = function(){

  $.get('../data/data.json').then(function(data) {
    console.log(data)
    // loadData(data)
    new Chart(document.getElementById('canvas').getContext('2d'), loadData(data))
  })
  // this.loadData()
}

function getPaycheckData() {}

// async function loadData() {
function loadData(data) {
  
  // # Define struct ----------------------------------
  let config = {
    type: 'bar',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      scales: {
        xAxes: [{stacked: true}],
        yAxes: [{stacked: true}]
      }
    }
  }

  let dataset = {
    label: [],
    data: [],
    backgroundColor: [],
    // borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1
  }// END OF Define struct----------------------------------

  // # Preprocess data ----------------------------------
  const types = data['incomes']['rows']
  const dates = data['incomes']['columns']
  const incomes = data['incomes']['values']
  const len = types.length
  // END OF Preprocess data ----------------------------------

  // # Build config structure ----------------------------------
  // Prepare dataset structure
  for (let index = 0; index < len; index++) {
    // Loop for the length of rows(types)
    let deepClone = JSON.parse(JSON.stringify(dataset))
    config.data.datasets.push(deepClone)
  }// ENDO OF Build config structure ----------------------------------
  
  // Insert data to structure ----------------------------------
  config.data.labels.push(...dates)
  types.forEach(function(type, i) {
    config.data.datasets[i].label.push(type)
  })
  incomes.forEach(function(income, i) {
    let arr = income
    let iterator = arr.values()
    for(let value of iterator) {
      config.data.datasets[i].data.push(value)
    }
  })

  let colors = []
  Object.keys(window.chartColors).forEach(function(key, i) {
    if (i < len) colors.push(key)
  })
  colors.forEach(function(color, i) {
    config.data.datasets[i].backgroundColor = window.chartColors[color]
  })// END OF Insert data to structure ----------------------------------

  return config
}