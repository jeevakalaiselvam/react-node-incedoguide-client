import React from 'react';
import CommonTabs from './ui-general/CommonTabs';
import Footer from './ui-general/Footer';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Card,
  Button,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Table,
} from 'reactstrap';

export default function RaiseCompOff() {
  return (
    <div id="raise-compoff">
      <CommonTabs index={2} />
      <Row style={{ textAlign: 'right' }}>
        <Col className="p-2 m-2" style={{ display: 'inline-block' }}>
          <Button className="incedo-quicklink">Quick Links</Button>
        </Col>
      </Row>

      <Row className="p-4" id="from-date">
        <Col>
          <Card>
            <CardBody>
              <FormGroup>
                <Label for="exampleDatetime">From Date</Label>
                <Input
                  id="exampleDatetime"
                  name="datetime"
                  placeholder="From Date"
                  type="date"
                />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <FormGroup>
                <Label for="exampleDatetime">To Date</Label>
                <Input
                  id="exampleDatetime"
                  name="datetime"
                  placeholder="To Data"
                  type="date"
                />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <FormGroup>
                <Label for="exampleEmail">No of Days</Label>
                <Input
                  id="exampleEmail"
                  name="number"
                  placeholder="1"
                  type="number"
                />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="p-4" id="comments">
        <Col>
          <Card>
            <CardBody>
              <FormGroup>
                <Label for="exampleText">Comments, if any</Label>
                <Input id="exampleText" name="text" type="textarea" />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}
