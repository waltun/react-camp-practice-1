const chart = document.getElementById('myChart');
const items = JSON.parse(localStorage.getItem('data'));
const labels = [];
const pricesIncome = [];
const pricesExpense = [];

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

//Config Chart.js
const myChart = new Chart(chart, {
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