import { useState } from "react";

function HandleButton(){
    let [counter,setCounter]=useState(0)
    function disableButton(){
        setCounter(counter+1)
    }
    console.log(counter)
    return <div>
         {/* <button onClick={disableButton} style={mystyle}>Click here to disable</button> */}
         <button disabled={counter==1} onClick={disableButton}>Disabled Button</button>
    </div>
}

export default HandleButton;