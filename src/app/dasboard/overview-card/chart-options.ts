export const chartOptions = {   
    chart: {
       type: 'column'
    },
    title: {
       text: 'Shares Value'
    },    
    yAxis : {
       min: 0,
       title: {
          text: 'Shares Cost'         
       }      
    },
    tooltip : {
        headerFormat: '',
        valueSuffix: '$'
     },
    plotOptions : {
       column: {
          pointPadding: 0.2,
          borderWidth: 0
       }
    },
 };