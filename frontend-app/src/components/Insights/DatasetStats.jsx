import "./InsightsCharts.css"

function DatasetStats(){

return(

<div className="glass-card stats-card">

<h3>Dataset Statistics</h3>

<div className="stats-grid">

<div className="stat-box">
<h4>24783</h4>
<p>Total Tweets</p>
</div>

<div className="stat-box">
<h4>1430</h4>
<p>Hate Speech</p>
</div>

<div className="stat-box">
<h4>19190</h4>
<p>Offensive</p>
</div>

<div className="stat-box">
<h4>4163</h4>
<p>Clean</p>
</div>

</div>

</div>

)

}

export default DatasetStats