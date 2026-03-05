import "./PredictionCard.css"

function PredictionCard({prediction}){

if(!prediction) return null

return(

<div className="prediction-card glass-card">

<h3>Prediction Result</h3>

<p className={`prediction-label ${prediction}`}>

{prediction}

</p>

</div>

)

}

export default PredictionCard