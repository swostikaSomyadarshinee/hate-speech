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

function F1Chart(){

const data={
labels:["Logistic","SVM","CNN","BERT"],

datasets:[
{
label:"F1 Score",

data:[0.71,0.75,0.88,0.91],

backgroundColor:"#00E5FF",

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

export default F1Chart