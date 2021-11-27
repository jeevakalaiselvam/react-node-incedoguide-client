import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CommonTabs from './ui-general/CommonTabs';

export default function LeaveHistory() {
  return (
    <div id="leave-history">
      <CommonTabs index={3} />
      <Row className="p-4" id="leave-history">
        Leave History
      </Row>
    </div>
  );
}
