import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import SelectLabel from '../components/SelectLabel';
import { changeUrl } from '../redux/actions/changeUrl';

class Config extends Component {
  constructor() {
    super();
    this.state = {
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
    const { category, difficulty, type } = this.state;
    setConfig(`https://opentdb.com/api.php?amount=5${category}${difficulty}${type}`);
    this.setState({
      category: '',
      difficulty: '',
      type: '',
    });
  }

  render() {
    const { category, difficulty, type, categories } = this.state;
    if (categories.length === 0) return <div>Loading...</div>;
    return (
      <div>
        <form>
          { console.log(categories) }
          <p data-testid="settings-title">settings-title</p>
          <Link to="/">Back</Link>
          <SelectLabel
            name="category"
            labelText="Select Category:"
            onChange={ this.handleChange }
            value={ category }
            optionList={ categories }
          />
          <label htmlFor="difficulty">
            <select name="difficulty" value={ difficulty } onChange={ this.handleChange }>
              <option value="">Any difficulty</option>
              <option value="&difficulty=easy">Easy</option>
              <option value="&difficulty=medium">Medium</option>
              <option value="&difficulty=hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            <select name="type" value={ type } onChange={ this.handleChange }>
              <option value="">Any type</option>
              <option value="&type=multiple">Multiple choice</option>
              <option value="&type=boolean">True / False</option>
            </select>
          </label>
          <input type="button" value="Save changes" onClick={ this.handleClick } />
        </form>
      </div>
    );
  }
}

Config.propTypes = {
  setConfig: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setConfig: (config) => dispatch(changeUrl(config)),
});

export default connect(null, mapDispatchToProps)(Config);
