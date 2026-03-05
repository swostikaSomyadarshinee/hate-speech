import { useState, useRef } from "react"

import "./Analyzer.css"

import ModelSelector from "../../components/ModelSelector/ModelSelector"
import PredictionCard from "../../components/PredictionCard/PredictionCard"
import ProbabilityBar from "../../components/ProbabilityBar/ProbabilityBar"
import ToxicWords from "../../components/ToxicWords/ToxicWords"
import Loader from "../../components/Loader/Loader"
import RealTimeChart from "../../components/Charts/RealTimeChart"
import ConfidenceGauge from "../../components/Charts/ConfidenceGauge"

/* CONFUSION MATRIX IMAGES */

import logisticMatrix from "../../assets/confusion_matrices/logistic.png"
import svmMatrix from "../../assets/confusion_matrices/svm.png"
import cnnMatrix from "../../assets/confusion_matrices/cnn.png"
import bertMatrix from "../../assets/confusion_matrices/bert.png"

function Analyzer() {

const [text,setText] = useState("")
const [model,setModel] = useState("bert")

const [prediction,setPrediction] = useState(null)
const [probs,setProbs] = useState(null)
const [toxicWords,setToxicWords] = useState([])

const [loading,setLoading] = useState(false)

const [history,setHistory] = useState([])

const resultRef = useRef(null)

/* CONFUSION MATRIX SELECTOR */

const getMatrixImage = () => {

switch(model){

case "logistic": return logisticMatrix
case "svm": return svmMatrix
case "cnn": return cnnMatrix
case "bert": return bertMatrix
default: return bertMatrix

}

}

/* MAIN ANALYSIS FUNCTION */

const analyzeText = async () => {

if(!text.trim() || loading) return

setLoading(true)

try{

const response = await fetch("http://localhost:5000/api/predict",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
text:text,
model:model
})

})

const data = await response.json()

if(!data) throw new Error("Invalid response")

/* UPDATE UI */

setPrediction(data.fused_prediction?.toLowerCase() || null)

setProbs(data.fused_probabilities || null)

setToxicWords(data.detected_words || [])

/* UPDATE REAL TIME GRAPH */

setHistory(prev=>[
...prev,
{
hate:data.fused_probabilities?.hate || 0,
offensive:data.fused_probabilities?.offensive || 0,
clean:data.fused_probabilities?.clean || 0
}
])

/* SCROLL TO RESULT */

setTimeout(()=>{
resultRef.current?.scrollIntoView({behavior:"smooth"})
},200)

}catch(error){

console.error("Prediction error:",error)

}

setLoading(false)

}

/* ENTER KEY SUPPORT */

const handleKeyPress = (e)=>{
if(e.key==="Enter" && !e.shiftKey){
e.preventDefault()
analyzeText()
}
}

/* TOXIC WORD HIGHLIGHT */

const highlightToxicWords = (text,words)=>{

if(!words || words.length===0) return text

let highlighted = text

words.forEach(word=>{

const regex = new RegExp(`(${word})`,"gi")

highlighted = highlighted.replace(
regex,
'<span class="toxic-highlight">$1</span>'
)

})

return highlighted

}

return(

<div className="analyzer">

<h2>AI Text Analyzer</h2>

<ModelSelector model={model} setModel={setModel}/>

<textarea
className="text-input"
placeholder="Enter text to analyze..."
value={text}
maxLength={500}
onChange={(e)=>setText(e.target.value)}
onKeyDown={handleKeyPress}
/>

<div className="char-counter">
{text.length} / 500 characters
</div>

<button
className="btn-primary analyze-btn"
onClick={analyzeText}
disabled={loading}
>
{loading ? "Analyzing..." : "Analyze"}
</button>

{loading && <Loader/>}

{/* HIGHLIGHT PREVIEW */}

{text && toxicWords.length>0 && (

<div
className="highlight-preview"
dangerouslySetInnerHTML={{
__html:highlightToxicWords(text,toxicWords)
}}
/>

)}

<div ref={resultRef}></div>

<PredictionCard prediction={prediction}/>

{probs && (

<div className="glass-card">

<h3>AI Toxicity Score</h3>

<ConfidenceGauge value={probs.hate || 0}/>

</div>

)}

{probs && (

<div className="glass-card">

<h3>Confidence Scores</h3>

<ProbabilityBar label="Hate Speech" value={probs?.hate || 0}/>
<ProbabilityBar label="Offensive" value={probs?.offensive || 0}/>
<ProbabilityBar label="Clean" value={probs?.clean || 0}/>

</div>

)}

<ToxicWords words={toxicWords}/>

{history.length>0 && (

<div className="glass-card">

<div className="chart-header">

<h3>Real-Time Prediction Monitoring</h3>

<button
className="clear-btn"
onClick={()=>setHistory([])}
>
Clear
</button>

</div>

<RealTimeChart history={history}/>

</div>

)}

<div className="glass-card matrix-viewer">

<h3>Confusion Matrix ({model.toUpperCase()})</h3>

<img
src={getMatrixImage()}
alt="Confusion Matrix"
className="matrix-image"
/>

</div>

</div>

)

}

export default Analyzer