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

export default function LeaveDashboard() {
  return (
    <div id="leave-dashboard">
      <CommonTabs index={0} />
      <Row style={{ textAlign: 'right' }}>
        <Col className="p-2 m-2" style={{ display: 'inline-block' }}>
          <Button className="incedo-quicklink">Quick Links</Button>
        </Col>
      </Row>
      <Row className="p-4" id="leave-balance">
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Current Leave Balance</CardTitle>
              <Table bordered>
                <thead>
                  <tr>
                    <th className="incedo-table-header">Leave Type</th>
                    <th className="incedo-table-header">
                      Available Leave Balance
                    </th>
                    <th className="incedo-table-header">Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Privilege Leave</td>
                    <td>18</td>
                    <td>Dec 29, 2021</td>
                  </tr>
                  <tr>
                    <td>Casual Leave</td>
                    <td>8</td>
                    <td>Dec 29, 2021</td>
                  </tr>
                  <tr>
                    <td>Compensatory Off</td>
                    <td>0</td>
                    <td>Dec 29, 2021</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="p-4" id="pending-approval">
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Pending for Approval</CardTitle>
              <Table bordered>
                <thead>
                  <tr>
                    <th className="incedo-table-header">Leave Type</th>
                    <th className="incedo-table-header">From Data</th>
                    <th className="incedo-table-header">To Date</th>
                    <th className="incedo-table-header">Days</th>
                    <th className="incedo-table-header">Approver</th>
                    <th className="incedo-table-header">Request Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Privilege Leave</td>
                    <td>24th November, 2021</td>
                    <td>25th November, 2021</td>
                    <td>2 Days</td>
                    <td>Swaminathan</td>
                    <td>23rd November, 2021</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}
