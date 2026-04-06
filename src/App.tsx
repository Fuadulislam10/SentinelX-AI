import { useState } from "react"
import { runScan } from "../web/api"

export default function App(){

const [target,setTarget]=useState("")
const [result,setResult]=useState<any>(null)

function scan(){

const data = runScan(target)

setResult(data)

}

return(

<div>

<h1>SentinelX-AI</h1>

<input

placeholder="example.com"
onChange={(e)=>setTarget(e.target.value)}

/>

<button onClick={scan}>Scan</button>

{result && (

<div>

<h3>Risk: {result.risk}</h3>

<ul>

{result.findings.map((f:string)=>

<li key={f}>{f}</li>

)}

</ul>

</div>

)}

</div>

)

}
