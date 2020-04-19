import React, { useState } from "react";
import BarChart2 from "../Components/Charts/BarChart2";
import PlayerUseOverTimeContainer from "./PlayerUseOverTimeContainer";

function AppHooks() {
  const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);
  

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
