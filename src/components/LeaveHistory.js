import React from 'react';
import CommonTabs from './ui-general/CommonTabs';
import { Row, Col, Card, CardBody, CardTitle, Table } from 'reactstrap';

export default function LeaveHistory() {
  return (
    <div id="leave-history">
      <CommonTabs index={3} />
      <Row className="p-4" id="leave-history">
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
    </div>
  );
}
