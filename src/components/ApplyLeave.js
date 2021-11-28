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
  Table,
  CardText,
} from 'reactstrap';

export default function ApplyLeave() {
  return (
    <div id="apply-leave">
      <CommonTabs index={1} />
      <Row style={{ textAlign: 'right' }}>
        <Col className="p-2 m-2" style={{ display: 'inline-block' }}>
          <Button className="incedo-quicklink">Quick Links</Button>
        </Col>
      </Row>
      <Row className="p-4" id="leave-information">
        <Col>
          <Card>
            <CardBody>
              <FormGroup>
                <Label for="exampleSelect">Select Leave Type</Label>
                <Input id="exampleSelect" name="select" type="select">
                  <option>Privilege Leave-CF</option>
                  <option>Privilege Leave</option>
                  <option>Casual Leave</option>
                  <option>Compensatory Off</option>
                  <option>Marriage Leave</option>
                  <option>Maternity/Adoption Leave</option>
                  <option>Maternity/Leave Extension</option>
                  <option>Miscarriage Leave</option>
                  <option>Paternity/Adoption Leave</option>
                  <option>Sabbatical Leave</option>
                  <option>Bereavement Leave</option>
                  <option>Leave Without Pay</option>
                  <option>Weekly Off</option>
                </Input>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <FormGroup>
                <Label for="exampleEmail">Available Leaves</Label>
                <Input
                  id="exampleEmail"
                  name="number"
                  disabled
                  placeholder="18"
                  type="number"
                />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="p-4" id="date-selection">
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
      <Row className="p-4" id="comments-input">
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
