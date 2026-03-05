import { Pie } from "react-chartjs-2"
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(
ArcElement,
Tooltip,
Legend
)

function HatePieChart(){

const data={
labels:["Hate","Offensive","Clean"],
datasets:[
{
data:[1430,19190,4163],
backgroundColor:[
"#ff2a2a",
"#ff8800",
"#00ff9c"
],
borderWidth:1
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

plugins:{
legend:{
position:"top",
labels:{
color:"#ccc"
}
}
},

layout:{
padding:10
}

}

return(

<div className="chart-container">
<Pie data={data} options={options}/>
</div>

)

}

export default HatePieChart