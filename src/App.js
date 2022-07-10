import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap'

function App() {
  return (
    <div className="App">

      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>Simulation</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
              </Card.Body>          
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>Orientation from Raspberry Pi</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
              </Card.Body>          
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
