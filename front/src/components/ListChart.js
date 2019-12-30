import React from 'react';

import {ListGroup, ListGroupItem} from 'reactstrap';

const ListChart = ({charts, handleItemClick}) => {
    let chart_list = charts.map((chart)=>{
        return (
            <ListGroupItem key={chart.id} href="#" onClick={(id) => handleItemClick(chart.id)}>
                <p>{chart.title}</p>
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