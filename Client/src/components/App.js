import './App.css';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import ArticleForm from "./ArticleForm";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9000/main-artikel')
      .then(response => {
        setState(response.data)
      })
  }, [])

  return (
    <div className="App">
      <Container className='game-container'>
        <Row>
          <Col xs={10} md={8} className='justify-content-center'>
            <Card>
              <Card.Body>
                <ArticleForm></ArticleForm>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
