import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { Button } from 'react-bootstrap';
import SelectLabel from '../components/SelectLabel';
import { changeUrl } from '../redux/actions/changeUrl';
import '../css/Config.css';

class Config extends Component {
  constructor() {
    super();
    this.state = {
      questionsNumber: 5,
      category: '',
      categories: [],
      difficulty: '',
      type: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount() {
    this.getCategory();
  }

  async getCategory() {
    try {
      const API = 'https://opentdb.com/api_category.php';
      const endpoint = await fetch(API);
      const res = await endpoint.json();
      const test = [{ id: '', name: 'Any category' }, ...res.trivia_categories];
      this.setState({
        categories: test,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { setConfig } = this.props;
    const { category, difficulty, type, questionsNumber } = this.state;
    setConfig(`https://opentdb.com/api.php?amount=${questionsNumber}${category}${difficulty}${type}`);
    this.setState({
      questionsNumber: 5,
      category: '',
      difficulty: '',
      type: '',
    });
  }

  render() {
    const { category, difficulty, type, categories, questionsNumber } = this.state;
    if (categories.length === 0) return <div>Loading...</div>;
    return (
      <form className="settings-form">
        <h2 data-testid="settings-title" className="settings-title">Settings</h2>
        <div className="settings-labels">
          <label htmlFor="questionsNumber" className="config-label">
            Number of questions:
            <input
              name="questionsNumber"
              type="number"
              min="1"
              max="10"
              value={ questionsNumber }
              onChange={ this.handleChange }
            />
          </label>
          <SelectLabel
            name="category"
            labelText="Select category:"
            onChange={ this.handleChange }
            value={ category }
            optionList={ categories }
            className="config-label"
          />
          <label htmlFor="difficulty" className="config-label">
            Select difficulty:
            <select name="difficulty" value={ difficulty } onChange={ this.handleChange }>
              <option value="">Any difficulty</option>
              <option value="&difficulty=easy">Easy</option>
              <option value="&difficulty=medium">Medium</option>
              <option value="&difficulty=hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type" className="config-label">
            Select type:
            <select name="type" value={ type } onChange={ this.handleChange }>
              <option value="">Any type</option>
              <option value="&type=multiple">Multiple choice</option>
              <option value="&type=boolean">True / False</option>
            </select>
          </label>
        </div>
        <section className="button-section-config">
          <Button><Link to="/" className="settings-back">Back</Link></Button>
          <Button onClick={ this.handleClick }>Save changes</Button>
        </section>
      </form>);
  }
}

Config.propTypes = {
  setConfig: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setConfig: (config) => dispatch(changeUrl(config)),
});

export default connect(null, mapDispatchToProps)(Config);
