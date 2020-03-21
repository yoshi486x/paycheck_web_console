window.onload = function(){
  async function loadData() {
    // Import data from json file
    console.log('Importing data')
    const response = await fetch('data/data.json');
    const data = await response.json();
    console.log(data);
    
    // Separate data into categories
    console.log('Separating data')
    const types = data['incomes']['rows']
    const dates = data['incomes']['columns']
    const incomes = data['incomes']['values']
    console.log(dates, types, incomes)

    console.log('Num of types', types.length)
    const len = types.length
    console.log('Num of incomes', incomes.length)
    
    // return len, types, dates, incomes
    // await drawIncomeChart(len, types, dates, incomes)
    let config = {
      type: 'bar',
      data: {
        labels: dates,
        datasets: []
      },
      options: {
        scales: {
          xAxes: [{stacked: true}],
          yAxes: [{stacked: true}]
        }
      }
    }

    // Setup
    console.log('Setup config for datasets with struct')
    let struct = {
      label: [],
      data: [],
      backgroundColor: [],
      // borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }

    const cloning = function() {
      for (let index = 0; index < len; index++) {
        // Loop for the length of rows(types)
        let deepClone = JSON.parse(JSON.stringify(struct))
        config.data.datasets.push(deepClone)
        console.log('struct:', struct)
        console.log('deepClone:', deepClone)
        console.log('Settup...')
      }
    }

    await cloning()
    console.log('datasets:', config.data.datasets)

    // Parse
    console.log('Insert data')
    types.forEach(function(type, i) {
      console.log(type)
      console.log(window.chartColors)
      config.data.datasets[i].label.push(type)
    })
    incomes.forEach(function(income, i) {
      console.log(income)
      let arr = income
      let iterator = arr.values()
      for(let value of iterator) {
        console.log(value)
        config.data.datasets[i].data.push(value)
      }
    })

    let colors = []
    Object.keys(window.chartColors).forEach(function(key, i) {
      if (i < len) colors.push(key)
    })
    console.log('color palette:', colors)
    colors.forEach(function(color, i) {
      console.log('color hex:', window.chartColors[color])
      config.data.datasets[i].backgroundColor = window.chartColors[color]
    })

    // let ctx = document.getElementById('canvas').getContext('2d');
    // window.myChart = new Chart(ctx, config)
    window.myChart = new Chart(document.getElementById('canvas').getContext('2d'), config)
    // console.log('config(in):', config)
    // return config
  }

  loadData();
  // new Chart(document.getElementById('canvas').getContext('2d'), loadData)
  // let config = loadData();
  // console.log('config:', config)
  // new Chart(document.getElementById('canvas').getContext('2d'), config)
};