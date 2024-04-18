import React from 'react';
import "./CarLoader.css";


const CarLoader = (props) => (
  /* background-color: rgba(0, 0, 0, 0.5); */
 
<div className="loader"style={{backgroundColor: props.otherback?props.otherback:'rgba(0, 0, 0, 0.5)'}}>
{/* <span>{props.otherback}</span> */}
<img className="spincar"src="/carspinner.png" alt="Loading..."/>
<img className="wheel wone"src="/carspinnerwheel.png" alt=""/>
<img className="wheel wtwo"src="/carspinnerwheel.png" alt=""/>
<span className="cartrail cone"></span>
<span className="cartrail ctwo"></span>
<span className="cartrail cthree"></span>
<span className="loadspin">Loading</span>
<span className="cartrail lone"></span>
<span className="cartrail ltwo"></span>
<span className="cartrail lthree"></span>

    </div>
);

export default CarLoader;
