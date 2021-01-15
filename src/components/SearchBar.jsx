import React, { Component } from 'react'

export default class SearchBar extends Component {
    render() {
        const filterText = this.props.filterText;
        return (
            <div>
                <input type="text" placeholder="Search..." value={filterText} />
            </div>
        )
    }
}
