import { Bar } from "react-chartjs-2"

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend
} from "chart.js"

import "./Charts.css"

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend
)

function AccuracyChart(){

const data={
labels:["Logistic","SVM","CNN","BERT"],

datasets:[
{
label:"Accuracy",

data:[0.84,0.86,0.90,0.93],

backgroundColor:"#FF2A2A",

borderRadius:6,

barThickness:40
}
]
}

const options={

responsive:true,

maintainAspectRatio:false,

animation:{
duration:1400,
easing:"easeOutCubic"
},

transitions:{
active:{
animation:{
duration:300
}
}
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

<Bar data={data} options={options}/>

</div>

)

}

export default AccuracyChart