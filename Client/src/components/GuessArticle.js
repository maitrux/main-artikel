
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios'

function GuessArticle() {
  const [lastRandomWord, setLastRandomWord] = useState({
    "articleSingular": "Der",
    "wordSingular": "Artikel",
    "articlePlural": "Die",
    "wordPlural": "Artikel",
    "englishTranslation": "Article"
  })

  const getRandomWord = () => {
    axios
    .get('/main-artikel/random-word')
    //.get('http://localhost:9000/main-artikel/random-word')
    .then(response => {
      var wordObject = response.data;
      setLastRandomWord(wordObject)
    })
  }

  const validateAnswer = (e) => {
    var clickedArticle = e.target.value;

    if(clickedArticle === lastRandomWord.articleSingular.toLowerCase()) {
      var articleText = document.querySelectorAll('.article-text.green')[0]

      e.target.classList.add("correct-answer");
      articleText.classList.remove("display-none");
      document.querySelectorAll('.article-button:not(correct-answer)').forEach(function(button) {
        button.classList.add("disabled");
      })

      setTimeout(() => {
        getRandomWord(clickedArticle);
        e.target.classList.remove("correct-answer");
        document.querySelectorAll('.article-button:not(correct-answer)').forEach(function(button) {
          button.classList.remove("disabled")
        })
        articleText.classList.add("display-none");
      }, 2500);
      
    }
    else {
      e.target.classList.add("disabled");

      setTimeout(() => {
        e.target.classList.remove("disabled");
      }, 1000);
    }
  }

  return(
    <div>
      <div className='word-text'><div className='article-text green display-none'>{lastRandomWord.articleSingular}</div>{lastRandomWord.wordSingular}</div>
      <div>(<div className='italic inline-flex'>{lastRandomWord.englishTranslation}</div>)</div>

      <div className='margin-top-lg'>
        <Button className="outline-black article-button" variant="" value={"der"} onClick={e => validateAnswer(e, "value")}>Der</Button>{' '}
        <Button className="outline-red article-button" variant="" value={"das"} onClick={e => validateAnswer(e, "value")}>Das</Button>{' '}
        <Button className="outline-yellow article-button" variant="" value={"die"} onClick={e => validateAnswer(e, "value")}>Die</Button>{' '}
      </div>
    </div>
  );
}

export default GuessArticle;