/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
 var brandcountArr = brandCount;
 var brandnameArr = brandName;
 console.log(brandcountArr,brandnameArr)
 brandcountArr = brandcountArr.split(',').map((el)=>{
   return Number(el)
 })
 brandnameArr = brandnameArr.split(',').map((el)=>{
   return el
 })
const barConfig = {
  type: 'bar',
  data: {
    labels:brandnameArr,
    datasets: [
      // {
      //   label: 'Shoes',
      //   backgroundColor: '#0694a2',
      //   // borderColor: window.chartColors.red,
      //   borderWidth: 1,
      //   data: [-3, 14, 52, 74, 33, 90, 70],
      // },
      {
        label: 'Sold Item',
        backgroundColor: '#7e3af2',
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: brandcountArr,
      },
    ],
  },
  options: {
    responsive: true,
    legend: {
      display: false,
    },
  },
}

const barsCtx = document.getElementById('bars')
window.myBar = new Chart(barsCtx, barConfig)
