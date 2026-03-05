import "./ProbabilityBar.css"

function ProbabilityBar({label,value}){

return(

<div className="prob-bar">

<div className="prob-header">

<span>{label}</span>

<span>{(value*100).toFixed(1)}%</span>

</div>

<div className="prob-track">

<div
className="prob-fill"
style={{width:`${value*100}%`}}
></div>

</div>

</div>

)

}

export default ProbabilityBar