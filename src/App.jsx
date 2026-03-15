import { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import GameOver from "./components/GameOver";

function App(){

const [screen,setScreen] = useState("start");
const [stats,setStats] = useState(null);

if(screen==="start"){
return <StartScreen startGame={()=>setScreen("game")} />
}

if(screen==="game"){
return (
<GameScreen
endGame={(data)=>{
setStats(data)
setScreen("gameover")
}}
/>
)
}

if(screen==="gameover"){
return (
<GameOver
stats={stats}
restart={()=>setScreen("game")}
/>
)
}

}

export default App;