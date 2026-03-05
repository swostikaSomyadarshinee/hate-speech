import {
RadialBarChart,
RadialBar,
PolarAngleAxis
} from "recharts"

function ConfidenceGauge({value = 0}){

const percent = Math.round(value * 100)

const data = [
{
name: "toxicity",
value: percent
}
]

let color = "#00ff9c"

if(percent > 70) color = "#ff2a2a"
else if(percent > 40) color = "#ff8800"

return(

<div style={{width:"100%",maxWidth:"300px",margin:"auto"}}>

<RadialBarChart
width={300}
height={250}
cx="50%"
cy="90%"
innerRadius="70%"
outerRadius="100%"
barSize={18}
data={data}
startAngle={180}
endAngle={0}
>

<PolarAngleAxis
type="number"
domain={[0,100]}
angleAxisId={0}
tick={false}
/>

<RadialBar
background
dataKey="value"
fill={color}
animationDuration={1200}
/>

</RadialBarChart>

<div style={{
textAlign:"center",
marginTop:"-40px",
fontSize:"22px",
fontWeight:"600"
}}>
{percent}%
</div>

</div>

)

}

export default ConfidenceGauge