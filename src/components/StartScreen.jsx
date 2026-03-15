function StartScreen({startGame}){

return(

<div style={{
height:"100vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(180deg,#ff7a00,#ff9900)",
fontFamily:"Arial",
color:"white",
textAlign:"center"
}}>

<div style={{fontSize:"60px"}}>🚕</div>

<h1 style={{
fontSize:"64px",
margin:"10px"
}}>
Autorickshaw Odyssey
</h1>

<p style={{
maxWidth:"600px",
fontSize:"20px"
}}>
Navigate the chaos of Mumbai traffic.  
The city never repeats itself.
</p>

<p style={{
marginTop:"20px",
opacity:"0.9"
}}>
Streets get faster. Traffic thickens. Weather changes.
<br/>
Unlock new abilities as you survive longer.
</p>

<button
onClick={startGame}
style={{
marginTop:"40px",
padding:"16px 45px",
fontSize:"18px",
borderRadius:"30px",
border:"none",
background:"black",
color:"white",
cursor:"pointer",
boxShadow:"0px 5px 15px rgba(0,0,0,0.4)"
}}
>
Start Driving
</button>

</div>

)

}

export default StartScreen;