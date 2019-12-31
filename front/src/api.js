const url = 'http://127.0.0.1:8000/api/v1/chart';

export const fetchCharts = async () => {
    return fetch(url,{})
    .then(res => res.json())
    .then(data => {
        return data
    });
}

export const fetchChart = (id) => {
    return {
        'id': 123,
        'title': 'hello',
        'content': 'Testing...'
    }
}

export const addChart = (chart) => {
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(chart)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })

    return chart;
}

export const updateChart = (chart) => {
    console.log('We are updating...');
    console.log('Update a chart with id', chart.id);
}