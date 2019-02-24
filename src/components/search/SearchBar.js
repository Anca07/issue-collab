import React from 'react';
import SearchResults from './SearchResults';
import '../../style.scss';
// import ToggleButton from 'react-toggle-button'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: {
        // Search terms to send to API
        text: '',
        status: 'open'
      },
      results: { items: [] } // Results returned from API
    };
  }

  getIssues = async () => {
    const { status, text } = this.state.terms;

    let url = `https://api.github.com/search/issues?q=type:issue+${text}+state:${status}&sort=created&order=desc&per_page=30`;

    const response = await fetch(url);
    const json = await response.json();

    this.setState({ results: json });
  };

  handleChange = event => {
    const newTerms = { ...this.state.terms };
    newTerms.text = event.target.value;
    // useful log with state
    this.setState({ terms: newTerms }, () => console.log('state', this.state));
  };

  render() {
    const { results, terms } = this.state;
    const totalItems = results.total_count;

    return (
      <div className='searchbar-wrapper'>
        <div>
          <h3 className='section-title'>Enter Your Search</h3>

          <input
            type='text'
            name='search-text'
            value={terms.text}
            onChange={this.handleChange}
          />

          <button onClick={this.getIssues}>Get Results</button>
        </div>

        {/* Number of results */}
        {results.items[0] && (
          <h4>Total results: {totalItems.toLocaleString()}</h4>
        )}

        {/* Pass search results to child component */}
        <SearchResults results={results} />
      </div>
    );
  }
}

export default SearchBar;