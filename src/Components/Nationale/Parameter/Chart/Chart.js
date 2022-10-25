import React from 'react';
import { Doughnut } from 'react-chartjs-2';



function Chart( props ) {

    const { data } = props

  return (
    <div style={{width : "80%", height:"80%"}}>
        <Doughnut data={data} />
    </div>
  );
}
export default Chart;