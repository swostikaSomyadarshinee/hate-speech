import { useEffect, useState } from "react"

import "./ConfusionMatrix.css"

function ConfusionMatrix(){

const [matrices,setMatrices] = useState([])

useEffect(()=>{

fetch("http://localhost:5000/api/confusion-matrices")

.then(res=>res.json())

.then(data=>{

setMatrices(data.confusion_matrices)

})

},[])

return(

<div className="glass-card matrix-card">

<h3>Confusion Matrices</h3>

<div className="matrix-grid">

{matrices.map((file,i)=>(

<img
key={i}
src={`http://localhost:5000/results/confusion_matrices/${file}`}
alt="matrix"
className="matrix-image"
/>

))}

</div>

</div>

)

}

export default ConfusionMatrix