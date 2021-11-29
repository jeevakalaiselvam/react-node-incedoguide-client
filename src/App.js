import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CONFIG from './config';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  FormGroup,
  Label,
  Input,
  CardText,
  TabContent,
  Button,
  Col,
  TabPane,
} from 'reactstrap';
import incedoImage from './assets/incedo.webp';
//import IncedoGuide from 'incedoguide';
import IncedoGuide from './library/IncedoGuide';
import LeaveDashboard from './components/LeaveDashboard';
import ApplyLeave from './components/ApplyLeave';
import RaiseCompOff from './components/RaiseCompOff';
import LeaveHistory from './components/LeaveHistory';
import { useState } from 'react';
import './index.css';
import CommonTabs from './components/ui-general/CommonTabs';
import HumanResources from './components/pages/HumanResources';

function App() {
  const [currentTab, setCurrentTab] = useState('1');

  const tabChangeHandler = (index) => {
    setCurrentTab((old) => index);
  };

  return (
    <div className="App">
      <Router>
        <Row>
          <div>
            <Navbar color="light" expand="md" light>
              <NavbarBrand href="/">
                <img src={incedoImage} alt="Incedo" className="incedo-navbar" />
              </NavbarBrand>
              <NavbarToggler onClick={function noRefCheck() {}} />
              <Collapse navbar>
                <Nav className="me-auto" navbar>
                  <NavLink href="/">Leave Portal</NavLink>
                  <NavLink href="/">Policy Center</NavLink>
                  <NavItem>
                    <NavLink href="/human-resources">Human Resources</NavLink>
                  </NavItem>
                  <NavLink href="/">Process Excellence</NavLink>
                </Nav>
                <IncedoGuide
                  userId={CONFIG.userId}
                  environment={CONFIG.environment}
                  projectName={CONFIG.projectName}
                  fullName={CONFIG.fullName}
                  emailId={CONFIG.emailId}
                  projectRoles={CONFIG.projectRoles}
                  currentUserId={CONFIG.currentUserId}
                  currentUserRoles={CONFIG.currentUserRoles}
                />
              </Collapse>
            </Navbar>
            <Container fluid className="p-2">
              <Switch>
                <Route path="/" exact component={LeaveDashboard} />
                <Route
                  path="/leave-dashboard"
                  exact
                  component={LeaveDashboard}
                />
                <Route path="/apply-leave" exact component={ApplyLeave} />
                <Route path="/request-compoff" exact component={RaiseCompOff} />
                <Route path="/leave-history" exact component={LeaveHistory} />
                <Route path="/leave-history" exact component={LeaveHistory} />
                <Route
                  path="/human-resources"
                  exact
                  component={HumanResources}
                />
              </Switch>
            </Container>
          </div>
        </Row>
      </Router>
    </div>
  );
}

export default App;
