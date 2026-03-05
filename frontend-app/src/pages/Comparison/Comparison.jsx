import { useEffect, useState } from "react"

import "./Comparison.css"

import AccuracyChart from "../../components/Charts/AccuracyChart"
import F1Chart from "../../components/Charts/F1Chart"
import ComparisonTable from "../../components/ComparisonTable/ComparisonTable"

function Comparison(){

const [tableData,setTableData] = useState([])

/* Default confusion matrices */

const matrices = [
"logistic.png",
"svm.png",
"cnn.png",
"bert.png"
]

useEffect(()=>{

fetch("http://localhost:5000/api/comparison")
.then(res=>res.json())
.then(data=>{
setTableData(data.comparison || [])
})
.catch(err=>console.error("Comparison fetch error:",err))

},[])

return(

<div className="comparison">

<h2 className="comparison-title">Model Comparison Dashboard</h2>

{/* Charts Section */}

<div className="chart-grid">

<div className="glass-card chart-card">

<h3>Model Accuracy</h3>

<AccuracyChart data={tableData}/>

</div>

<div className="glass-card chart-card">

<h3>F1 Score</h3>

<F1Chart data={tableData}/>

</div>

</div>


{/* Confusion Matrices */}

<div className="glass-card matrices-section">

<h3>Confusion Matrices</h3>

<div className="matrix-grid">

{matrices.map((file,i)=>(

<div key={i} className="matrix-card">

<img
src={`http://localhost:5000/results/confusion_matrices/${file}`}
className="matrix-image"
alt={`confusion-matrix-${file}`}
/>

<p className="matrix-label">

{file.replace(".png","").toUpperCase()}

</p>

</div>

))}

</div>

</div>


{/* Comparison Table */}

<div className="glass-card table-section">

<h3>Model Comparison</h3>

<ComparisonTable data={tableData}/>

</div>

</div>

)

}

export default Comparison