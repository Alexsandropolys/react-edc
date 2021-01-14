import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
    state = {
        term: ''
    }
    onChange = (e) => {
        this.setState({ term: e.target.value })
        this.props.onUpdSearch(e.target.value);
    }
    render = () => {
        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записям"
                onChange={this.onChange}
            />
        )
    }
}

