import React from 'react';
import { Form, FormGroup, Input, Card, CardTitle } from 'reactstrap';

const EditChartForm = ({chart, handleChange }) => (
  <Form>
    <Card body>
      <FormGroup>
        <CardTitle>{chart.title}</CardTitle>
        <Input onChange={handleChange} value={chart.content} type="textarea" name="content"/>
      </FormGroup>
    </Card>
  </Form>
)

export default EditChartForm;