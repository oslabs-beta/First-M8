import React from "react";
import {useState, useEffect} from "react";
import HistoryDetail from './HistoryDetail'

const details = [
  {type: 'custom', promQL: 'HTTP_REQUEST_TOTAL', time: 12321436712123},
  {type: 'dnd', promQL: 'sum(HTTP_REQUEST_TOTAL)'},
];

const HistoryContainer = () => {
  const [promQLHistory, setPromQLHistory] = useState([])

  useEffect(() => {
    fetch("/history") //go to backend and back end sends back response
    .then(response => response.json())
    .then((data) => {
      setPromQLHistory(data);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  
  const ans = details.map((detail) => {
    return ( <HistoryDetail key={`historydetail${detail.time}`} 
    setPromQLHistory = {setPromQLHistory}
    detail={detail}/>)
  })


  return (
  <div className = "historyContainer">
    History Container 
    {ans}
  </div>

  )
}; // History Container [HTTP_REQUEST_TOTAL, sum(HTTP_REQUEST_TOTAL)]

/* History Container
    type       PromQL
    custom     HTTP_REQUEST_TOTAL
    dnd        sum(HTTP_REQUEST_TOTAL)
*/


export default HistoryContainer;
