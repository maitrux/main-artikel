import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { useState } from 'react';
import axios from 'axios'

function ArticleForm() {
  const [articleSingular, setArticleSingular] = useState('„Main“')
  const [wordSingular, setWordSingular] = useState('Artikel');
  const [wordPlurar, setWordPlurar] = useState('');
  const [englishTranslation, setEnglishTranslation] = useState('');

  const [wordFound, setWordFound] = useState(true);
  const [translationFound, setTranslationFound] = useState(false);
  const [disableFind, setDisableFind] = useState(true);

  // Disable the "find article" button, if the word input is empty.
  const handleWordInputChange = (e) => {
   setDisableFind(e.target.value === "")
  }

  const findWord = (word) => {
    axios
    .get('/main-artikel/article', { params: { word: word }})
    .then(response => {
      var wordObject = response.data;
      if(Object.keys(wordObject).length === 0) {
        setWordFound(false);
        setTranslationFound(false);
      }
      else {
        setArticleSingular(wordObject.articleSingular);
        setWordSingular(wordObject.wordSingular);
        setEnglishTranslation(wordObject.englishTranslation);
        setWordPlurar(wordObject.wordPlural);

        setWordFound(true);
        setTranslationFound(true);
      }
    })
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    const inputWord = e.target.word.value
    findWord(inputWord)
  }

  return(
    <div>
      <div className={`${!wordFound ? "" : "display-none"}`}>
        <img className='something-went-wrong-img' src={require('../something_went_wrong.jpg')} />
        <div className='error-text-bold'>Oh no!</div>
        <div>Couldn't find the word you were looking for.</div>
      </div>

      <div className={`${wordFound ? "" : "display-none"}`}>
        <div className='word-text'><div className='article-text'>{articleSingular}</div>{wordSingular}</div>
        <div className={`${translationFound ? "" : "display-none"}`}>Die {wordPlurar}</div>
        <div className={`${translationFound ? "" : "display-none"}`}>(<div className='italic inline-flex'>{englishTranslation}</div>)</div>
      </div>

      <Form id='find-article-form' onSubmit={handleSubmit}>
        <Form.Control className='article-input' name="word" placeholder="Enter a word" onInput={(e) => handleWordInputChange(e)} required/>
        <Row className='flex-row-reverse'>
          <Col xs={12} md={5}>
            <Button className={`margin-top-sm float-right ${disableFind ? "disabled" : ""}`} type="submit">Find the article</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ArticleForm;