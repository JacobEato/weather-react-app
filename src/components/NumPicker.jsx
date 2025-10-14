import {React, useState} from "react";

function NumPicker(props){
    const [val, setVal] = useState(0);

    function updateVal(event){
        const newVal = event.target.value;
        setVal(newVal);
        props.update(newVal)
    }

    return(
        <div className="numPicker">
            <h2>Pick a Number</h2>
            <p>Number represents how many hours prior the baloon and weather data will be from the current time.</p>
            <p className="dissappear-medium">(For example, 2 would mean balloon and weather data would be from 2 hours ago)</p>
            <input type="number" onChange={updateVal} value={val} max={23} min={0}/>
        </div>
    );
}

export default NumPicker;