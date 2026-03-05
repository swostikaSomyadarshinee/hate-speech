import "./ToxicWords.css"

function ToxicWords({words}){

if(!words || words.length===0) return null

return(

<div className="toxic-card glass-card">

<h3>Detected Toxic Words</h3>

<div className="toxic-list">

{words.map((word,index)=>(

<span key={index} className="toxic-word">

{word}

</span>

))}

</div>

</div>

)

}

export default ToxicWords