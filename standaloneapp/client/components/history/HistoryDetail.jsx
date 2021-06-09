import React from 'react'

const HistoryDetail = ({detail, setPromQLHistory}) => {

    const deleteHistory = () => { // client will press delete => database deletes entry => rerender without the deleted entry
        fetch('/history/delete', 
        {method: "DELETE",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(detail)
        })
        .then(response => response.json())
        .then(data => setPromQLHistory(data))
    }
    return(

        <div>
            <p>
              <span>{detail.type}</span> {detail.promQL}
            </p>
              <button onClick = {deleteHistory}>Delete</button>
              
        </div>
    )
}

export default HistoryDetail;