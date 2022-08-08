import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default class Game extends React.Component {
  state = {
    questions: [],
    questionIndex: 0,
    loading: true,
  }

  componentDidMount() {
    this.requestQuestion();
  }

  requestQuestion = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const ApiQuestion = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(ApiQuestion);
    const data = await response.json();
    const { results } = data;
    console.log(results);
    if (results.length === 0) {
      localStorage.clear();
      history.push('/');
    }
    this.setState({ questions: results, loading: false });
  }

  render() {
    const RANDOM_HELPER = 0.5;
    const { questions, questionIndex, loading } = this.state;
    const currQuestion = questions[questionIndex];
    let response = [];
    if (currQuestion) {
      response = [
        currQuestion.correct_answer,
        ...currQuestion.incorrect_answers,
      ];
    }
    console.log(response);

    return loading ? (<div> Loading...</div>) : (
      <div>
        <Header />
        <main>
          <p data-testid="question-category">{currQuestion.category}</p>
          <p data-testid="question-text">
            {currQuestion.question}
          </p>
          <div data-testid="answer-options">
            {response.sort(() => Math.random() - RANDOM_HELPER).map((answer, index) => {
              let dataTestId = 'correct-answer';
              if (answer !== currQuestion.correct_answer) {
                dataTestId = `wrong-answer-${index}`;
              }
              return (
                <button
                  key={ answer }
                  type="button"
                  data-testid={ dataTestId }
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.object,
}.isRequired;
