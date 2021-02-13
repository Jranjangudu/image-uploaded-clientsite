import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel';
function Errorhandel(props) {
    return (
        <div>
            <strong className="text-danger " >{props.message}</strong>
            <p onClick={props.clearError} style={{paddingLeft:"3px",cursor:"pointer",color:"red"}}> < CancelIcon/> </p>

  
        </div>
    )
}

export default Errorhandel
