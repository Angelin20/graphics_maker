import React, {Component} from 'react';
import {Button,Container,Row,Col} from 'reactstrap';

import ListChart from './components/ListChart';
import AddChartForm from './components/AddChartForm';
import EditChartForm from './components/EditChartForm';
import {fetchCharts,fetchChart,addChart} from './api';
import Websocket from 'react-websocket';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      charts: [],
      chart: {},
      current_chart_id:0,
      is_creating: true,
      is_fetching:true,
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAddChart = this.handleAddChart.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSaveChart = this.handleSaveChart.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  async getData(){
    let data = await fetchCharts();
    this.setState({charts:data, is_fetching: false});
  }

  async handleItemClick(id) {
    let selected_chart = await fetchChart(id);

    this.setState((prevState) => {
      return {
        is_creating: false, 
        current_chart_id: id,
        chart: selected_chart
      }
    })
  }

  handleAddChart(){
    this.setState((prevState) =>{
      return {is_creating: true}
    })
  }

  async handleSaveChart(data){
    await addChart(data);
    await this.getData();
  }

  handleData(data) {
    let result = JSON.parse(data);

    let current_chart = this.state.chart;
    if(current_chart.id === result.id) {
      this.setState({chart: result});
    }
  }

  handleOnChange(e) {
    let content = e.target.value;
    let current_chart = this.state.chart;
    current_chart.content = content;

    this.setState({
      chart: current_chart
    });

    const socket = this.refs.socket;
    socket.state.ws.send(JSON.stringify(current_chart));
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs="10">
              <h2>Consulta de graficas</h2>
            </Col>
            <Col xs="2">
              <Button color="primary" onClick={this.handleAddChart}>Crear nueva grafica</Button>
            </Col>
          </Row>
          <Row>
            <Col xs="4">
            {
              this.state.is_fetching ?
              "Loading..." :
              <ListChart charts={this.state.charts} handleItemClick={(id) => this.handleItemClick(id)} />
            }
            </Col>
            <Col xs="8">
              <p>content</p>
              {
                this.state.is_creating ?
                <AddChartForm handleSave={this.handleSaveChart}/> :
                <EditChartForm handleChange={this.handleOnChange} chart={this.state.chart}/>
              }
              <Websocket ref="socket" url='ws://127.0.0.1:8000/ws/charts'
                onMessage={this.handleData.bind(this)} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
