/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
var countArr = categoryCount;
var nameArr = categoryName;
countArr = countArr.split(',').map((el)=>{
  return Number(el)
})
nameArr = nameArr.split(',').map((el)=>{
  return el
})
// console.log(countArr,nameArr);
const pieConfig = {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: countArr,
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: [
          '#0694a2',
          '#1c64f2',
          '#7e3af2',
          '#7e3ab2'
        ],
        label: 'Dataset 1',
      },
    ],
    labels: nameArr,
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
    /**
     * Default legends are ugly and impossible to style.
     * See examples in charts.html to add your own legends
     *  */
    legend: {
      display: false,
    },
  },
};

// change this to the id of your chart element in HMTL
const pieCtx = document.getElementById('pie');
window.myPie = new Chart(pieCtx, pieConfig);
