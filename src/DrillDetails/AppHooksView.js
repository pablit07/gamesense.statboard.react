import React, { useState } from "react";
import BarChart2 from "../Components/Charts/BarChart2";
import PlayerUseOverTimeContainer from "./PlayerUseOverTimeContainer";

function AppHooks() {
  const [data, setData] = useState([45,105,90, 40,66,135,65, 120, 38, 85, 75, 77]);
  

  return (
    <React.Fragment>
      <BarChart2 data={data} />
      <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter data
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
    </React.Fragment>
  );
}

export default AppHooks;
