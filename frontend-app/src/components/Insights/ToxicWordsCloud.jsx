import "./InsightsCharts.css"

function ToxicWordsCloud(){

const words = [
"hate","stupid","idiot","trash",
"kill","racist","dumb","loser",
"fool","moron","garbage","shut up",

"bitch","slut","whore","cunt",
"asshole","bastard","scumbag",
"freak","pervert","degenerate",

"retard","spaz","mentalcase",

"subhuman","parasite","vermin",
"inferior","animal","beast",
"monster","filthy","traitor",

"kill","murder","die","burn",
"hang","shoot","stab","bomb",
"massacre","destroy","slaughter"
];

return(

<div className="glass-card word-cloud">

<h3>Top Toxic Words</h3>

<div className="word-container">

{words.map((word,i)=>(
<span key={i} className="toxic-cloud-word">
{word}
</span>
))}

</div>

</div>

)

}

export default ToxicWordsCloud