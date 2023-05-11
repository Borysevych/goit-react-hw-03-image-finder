import { Component } from 'react';
import {
  SearchbarWrap,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
export class Searchbar extends Component {
  state = {
    searchValue: '',
  };
  handleChange = e => {
    this.setState({
      searchValue: e.currentTarget.value,
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const searchValue = this.state.searchValue.toLowerCase().trim();
    this.props.onSubmit(searchValue);
  };
  render() {
    return (
      <SearchbarWrap>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            name="serchFormField"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchValue}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarWrap>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};