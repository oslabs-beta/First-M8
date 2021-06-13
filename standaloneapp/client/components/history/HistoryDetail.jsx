import React from 'react'

const HistoryDetail = ({detail, promQLHistory,setPromQLHistory}) => {

    console.log("this is detail", detail);
    const deleteHistory = async () => { // client will press delete => database deletes entry => rerender without the deleted entry
        await fetch(`/history/delete/${detail._id}`, 
        {method: "DELETE",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(detail)
        })
        .then(response => response.json())
        .then(data => {
            
            const newData = promQLHistory.filter((query) => {
                return query._id !== data._id
            })
            setPromQLHistory(newData)})
    }
    return(

        <div>
            <p>
              <span>{detail.name}</span> {detail.promqlHis.bucket}
            </p>
              <button onClick = {deleteHistory}>Delete</button>
              
        </div>
    )
}

export default HistoryDetail;