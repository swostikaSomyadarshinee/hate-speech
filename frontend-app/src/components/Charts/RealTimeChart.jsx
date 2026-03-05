import { Line } from "react-chartjs-2"

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Legend
} from "chart.js"

import "./Charts.css"

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Tooltip,
Legend
)

function RealTimeChart({history}){

const data={

labels:history.map((_,i)=>`Test ${i+1}`),

datasets:[
{
label:"Hate Probability",

data:history.map(item=>item.hate),

borderColor:"#ff2a2a",

backgroundColor:"rgba(255,42,42,0.15)",

pointBackgroundColor:"#ff2a2a",

pointRadius:4,

tension:0.4,

fill:true
}
]

}

const options={

responsive:true,

maintainAspectRatio:false,

animation:{
duration:900,
easing:"easeOutQuart"
},

plugins:{
legend:{display:false},
tooltip:{
backgroundColor:"#111",
titleColor:"#fff",
bodyColor:"#ddd"
}
},

scales:{
y:{
beginAtZero:true,
grid:{
color:"rgba(255,255,255,0.05)"
}
},
x:{
grid:{display:false}
}
}

}

return(

<div className="chart-container">

<Line data={data} options={options}/>

</div>

)

}

export default RealTimeChart