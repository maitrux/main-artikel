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
import GuessArticle from './GuessArticle';
import { Button } from 'react-bootstrap';

function App() {
  const [state, setState] = useState([]);
  const [showGuess, setShowGuess] = useState(false);

  const handleGameState = (e) => {
    var gameState = e.target.value;

    if(gameState === "search") {
      setShowGuess(false)
    }
    else if(gameState === "guess")
    {
      setShowGuess(true)
    }
  }

  useEffect(() => {
    axios
      .get('/main-artikel')
      //.get('http://localhost:9000/main-artikel')
      .then(response => {
        setState(response.data)
      })
  }, [])

  return (
    <div className="App">
      <div className="game-navbar">
      <div className='list-icon pointer'>
        <Button className="fill-yellow" variant="" value="search" onClick={e => handleGameState(e, "value")}>Search</Button>{' '}
        <Button className="fill-red" variant="" value="guess" onClick={e => handleGameState(e, "value")}>Guess</Button>{' '}
      </div>
      </div>
      <Container className='game-container'>
        <Row>
          <Col xs={10} md={8} className='justify-content-center'>
            <Card>
              <Card.Body>
                <div className={`${showGuess ? "" : "display-none"}`}>
                  <GuessArticle />
                </div>
                <div className={`${showGuess ? "display-none" : ""}`}>
                  <ArticleForm />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
