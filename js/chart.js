function runChart() {
    const labels = [];
    const pricesIncome = [];
    const pricesExpense = [];
    const items = JSON.parse(localStorage.getItem('data'));

    //Save year and month in new array
    items.forEach(item => {
        labels.push(item.year + '/' + item.month);
    });

    //Save income prices in new array
    items.forEach(item => {
        if (item.type == 'income') {
            pricesIncome.push(item.price)
        }
    });

    //save expense prices in new array
    items.forEach(item => {
        if (item.type == 'expense') {
            pricesExpense.push(item.price)
        }
    });

    $("canvas#myChart").remove();
    $("div.chartSection").append('<canvas id="myChart" width="400" height="300"></canvas>');
    let chart = document.getElementById("myChart").getContext('2d');


    //Config Chart.js
    let myChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: labels.sort(),
            datasets: [
                {
                    label: 'درآمد',
                    data: pricesIncome,
                    backgroundColor: 'rgb(0, 102, 51)',
                    borderColor: 'rgb(0, 153, 76)',
                },
                {
                    label: 'هزینه',
                    data: pricesExpense,
                    backgroundColor: 'rgb(204, 0, 0)',
                    borderColor: 'rgb(153, 0, 0)',
                }
            ]
        },
    });
}