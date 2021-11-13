import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
// import Tourme from 'jeeva-tourme';
import Tourme from './library/components/Tourme';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Column, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Router>
            <div>
              <Navbar bg="light" expand="lg">
                <Container>
                  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link href="/page1">Page1</Nav.Link>
                      <Nav.Link href="/page2">Page2</Nav.Link>
                      <Tourme />
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
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
            </div>
          </Router>
        </Row>
      </Container>
    </div>
  );
}

export default App;
