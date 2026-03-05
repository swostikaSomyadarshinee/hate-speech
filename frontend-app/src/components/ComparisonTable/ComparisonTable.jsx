import "./ComparisonTable.css"

function ComparisonTable({ data }){

return(

<div className="table-wrapper">

<table className="comparison-table">

<thead>

<tr>
<th>Model</th>
<th>Accuracy</th>
<th>F1 Score</th>
<th>Type</th>
</tr>

</thead>

<tbody>

{data.map((item,i)=>(

<tr key={i}>

<td>{item.Model}</td>

<td>{Number(item.Accuracy).toFixed(2)}</td>

<td>{Number(item.Macro_F1).toFixed(2)}</td>

<td>
{item.Model === "BERT"
? "Transformer"
: item.Model === "CNN"
? "Deep Learning"
: "Machine Learning"}
</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default ComparisonTable