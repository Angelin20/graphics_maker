import React, {Component} from 'react';
import {Button,Container,Row,Col} from 'reactstrap';

import ListChart from './components/ListChart';
import AddChartForm from './components/AddChartForm';
import {fetchCharts,fetchChart,addChart,updateChart} from './api';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      charts: [],
      current_chart_id:0,
      is_creating: true,
      is_fetching:true
    }

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleAddChart = this.handleAddChart.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSaveChart = this.handleSaveChart.bind(this);
  }

  componentDidMount(){
    this.getData();
  }

  async getData(){
    let data = await fetchCharts();
    this.setState({charts:data})
  }

  handleItemClick(id){
    this.setState((prevState) =>{
      return {is_creating: false, current_chart_id: id}
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
              <ListChart charts={this.state.charts} handleItemClick={(id) => this.handleItemClick(id)} />
            </Col>
            <Col xs="8">
              <p>content</p>
              {
                this.state.is_creating ?
                <AddChartForm handleSave={this.handleSaveChart}/> :
                `Editing note with id: ${this.state.current_chart_id}`
              }
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
