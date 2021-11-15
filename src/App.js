import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
// import Tourme from 'jeeva-tourme';
import Tourme from './library/Tourme';
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
  UncontrolledDropdown,
  DropdownToggle,
  Container,
  DropdownMenu,
  DropdownItem,
  Row,
} from 'reactstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Router>
            <div>
              <Navbar color="light" expand="md" light>
                <NavbarBrand href="/">Tourme App</NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() {}} />
                <Collapse navbar>
                  <Nav className="me-auto" navbar>
                    <NavItem>
                      <NavLink href="/components/">Components</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/page1">Page1</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/page2">Page2</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/page3">Page3</NavLink>
                    </NavItem>
                    <UncontrolledDropdown inNavbar nav>
                      <DropdownToggle caret nav>
                        Options
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Option 1</DropdownItem>
                        <DropdownItem>Option 2</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Reset</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                  <Tourme
                    userId={CONFIG.userId}
                    environment={CONFIG.environment}
                    projectName={CONFIG.projectName}
                    fullName={CONFIG.fullName}
                    emailId={CONFIG.emailId}
                  />
                </Collapse>
              </Navbar>
              <Container>
                <Switch>
                  <Route path="/" exact>
                    <Page1 />
                  </Route>
                  <Route path="/page1" exact>
                    <Page1 />
                  </Route>
                  <Route path="/page2" exact>
                    <Page2 />
                  </Route>
                </Switch>
              </Container>
            </div>
          </Router>
        </Row>
      </Container>
    </div>
  );
}

export default App;
