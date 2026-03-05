import { useEffect, useState } from "react"

import "./Insights.css"

import ClassDistributionChart from "../../components/Insights/ClassDistributionChart"
import ToxicWordsCloud from "../../components/Insights/ToxicWordsCloud"
import DatasetStats from "../../components/Insights/DatasetStats"
import HatePieChart from "../../components/Insights/HatePieChart"

function Insights(){

const [plots,setPlots] = useState([])

useEffect(()=>{

fetch("http://localhost:5000/api/performance-plots")

.then(res=>res.json())

.then(data=>{
setPlots(data.plots || [])
})

},[])

return(

<div className="insights">

<h2 className="insights-title">Dataset Insights</h2>


{/* ================= Dataset Description ================= */}

<div className="glass-card dataset-card">

<h3>About the Dataset</h3>

<p>
The hate speech detection system was trained on a Twitter dataset
containing labeled examples of hate speech, offensive language,
and neutral content.
</p>

<p>
Multiple machine learning and deep learning models were evaluated
to determine the most effective approach for detecting toxic
language in social media content.
</p>

</div>


{/* ================= Dataset Statistics ================= */}

<DatasetStats/>


{/* ================= Dataset Charts ================= */}

<div className="chart-grid">

<div className="glass-card">

<h3>Tweet Class Distribution</h3>

<ClassDistributionChart/>

</div>

<div className="glass-card">

<h3>Class Ratio</h3>

<HatePieChart/>

</div>

</div>


{/* ================= Model Performance ================= */}

<div className="glass-card performance-card">

<h3>Model Performance</h3>

<div className="plots-grid">

{plots.map((file,i)=>(

<div key={i} className="plot-card">

<img
src={`http://localhost:5000/results/performance_plots/${file}`}
alt="performance plot"
className="plot-image"
/>

</div>

))}

</div>

</div>


{/* ================= Toxic Word Cloud ================= */}

<ToxicWordsCloud/>

</div>

)

}

export default Insights