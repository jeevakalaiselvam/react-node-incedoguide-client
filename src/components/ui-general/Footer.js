import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavLink,
  NavItem,
} from 'reactstrap';
import '../../index.css';

export default function Footer({ index }) {
  return (
    <div>
      {/* <Navbar color="light" expand="md" light>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavLink href="/leave-dashboard">Leave Dashboard</NavLink>
            <NavLink href="/apply-leave">Apply Leave</NavLink>
            <NavItem>
              <NavLink href="/request-compoff">Request Comp-Off</NavLink>
            </NavItem>
            <NavLink href="/leave-history">Leave History</NavLink>
          </Nav>
        </Collapse>
      </Navbar> */}
    </div>
  );
}
