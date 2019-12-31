import React from 'react';
import Chart from './Chart'

import {ListGroup, ListGroupItem} from 'reactstrap';

const ListChart = ({charts, handleItemClick}) => {
    let chart_list = charts.map((chart)=>{
        return (
            <ListGroupItem key={chart.id} href="#" onClick={(id) => handleItemClick(chart.id)}>
                <Chart title={chart.title}/>
            </ListGroupItem>
        )
    })

    return (
        <ListGroup>
            {chart_list}
        </ListGroup>
    )
}

export default ListChart;