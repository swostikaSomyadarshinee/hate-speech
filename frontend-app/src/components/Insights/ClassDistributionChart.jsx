import { Bar } from "react-chartjs-2"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend
)

function ClassDistributionChart(){

const data={
labels:["Hate Speech","Offensive","Clean"],
datasets:[
{
label:"Tweet Count",
data:[1430,19190,4163],
backgroundColor:[
"#ff2a2a",
"#ff8800",
"#00ff9c"
]
}
]
}

const options={
responsive:true,
plugins:{legend:{display:false}}
}

return <Bar data={data} options={options}/>
}

export default ClassDistributionChart