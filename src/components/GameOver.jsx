function GameOver({ stats, restart }) {

return(

<div style={{
height:"100vh",
background:"#0f0f14",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontFamily:"Arial"
}}>

<div style={{
background:"#1c1c25",
padding:"50px",
borderRadius:"20px",
textAlign:"center",
color:"white",
width:"420px",
boxShadow:"0px 20px 50px rgba(0,0,0,0.8)"
}}>

<h1 style={{fontSize:"42px"}}>💥 Journey Ended</h1>

<p>The city claimed another rickshaw...</p>

<div style={{
marginTop:"20px",
background:"#2a2a35",
padding:"20px",
borderRadius:"12px",
display:"flex",
justifyContent:"space-around"
}}>

<div>
<p>Distance</p>
<h2>{stats.score}m</h2>
</div>

<div>
<p>Coins</p>
<h2>₹{stats.coinsCollected}</h2>
</div>

<div>
<p>Fuel</p>
<h2>{Math.floor(stats.fuel)}</h2>
</div>

</div>

<h3 style={{marginTop:"20px"}}>
High Score: {stats.highScore}
</h3>

<button
onClick={restart}
style={{
marginTop:"25px",
padding:"14px 40px",
fontSize:"18px",
background:"#ff5a00",
color:"white",
border:"none",
borderRadius:"30px",
cursor:"pointer"
}}
>
Drive Again
</button>

</div>

</div>

)

}

export default GameOver;