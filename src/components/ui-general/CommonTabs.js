import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';
import '../../index.css';

export default function CommonTabs({ index }) {
  return (
    <div id="common-tabs">
      <ButtonGroup>
        <Link
          to="/leave-dashboard"
          className={
            index === 0 ? 'incedo-tab incedo-tab-active' : 'incedo-tab'
          }
        >
          Leave Dashboard
        </Link>
        <Link
          to="/apply-leave"
          className={
            index === 1 ? 'incedo-tab incedo-tab-active' : 'incedo-tab'
          }
        >
          Apply Leave
        </Link>
        <Link
          to="/request-compoff"
          className={
            index === 2 ? 'incedo-tab incedo-tab-active' : 'incedo-tab'
          }
        >
          Request Comp-Off
        </Link>
        <Link
          to="/leave-history"
          className={
            index === 3 ? 'incedo-tab incedo-tab-active' : 'incedo-tab'
          }
        >
          Leave History
        </Link>
      </ButtonGroup>
    </div>
  );
}
