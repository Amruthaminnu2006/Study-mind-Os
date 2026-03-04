import CalendarHeatmap from "react-calendar-heatmap"
import "react-calendar-heatmap/dist/styles.css"
import { useEffect,useState } from "react"
import { getUser } from "../lib/utilss/getUser.js";
export default function StudyHeatmap(){

const [sessions,setSessions]=useState<any[]>([])
const user=getUser()

useEffect(()=>{

const fetchSessions=async()=>{

try{

const res=await fetch(
`http://localhost:5000/api/sessions?userId=${user.userId}`
)

const data=await res.json()

if(data.success){
setSessions(data.sessions)
}

}catch(err){
console.error("Session fetch error",err)
}

}

fetchSessions()

},[])

const heatmapData=sessions.map((s)=>({
date:s.date,
count:s.xpEarned
}))

return(

<div className="bg-card border rounded-xl p-6 shadow-sm">

<h3 className="font-semibold mb-4">
Study Activity
</h3>

<div className="heatmap-container">

<CalendarHeatmap
startDate={new Date("2026-01-01")}
endDate={new Date()}
values={heatmapData}
classForValue={(value)=>{

if(!value) return "color-empty"
if(value.count<50) return "color-scale-1"
if(value.count<100) return "color-scale-2"
if(value.count<200) return "color-scale-3"

return "color-scale-4"

}}
/>

</div>

</div>

)

}