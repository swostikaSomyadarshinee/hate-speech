import "./ModelSelector.css"

function ModelSelector({model,setModel}){

return(

<div className="model-selector glass-card">

<h3>Select Model</h3>

<select
value={model}
onChange={(e)=>setModel(e.target.value)}
>

<option value="logistic">Logistic Regression</option>

<option value="svm">SVM</option>

<option value="cnn">CNN</option>

<option value="bert">BERT</option>

</select>

</div>

)

}

export default ModelSelector