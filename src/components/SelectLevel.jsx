import React, { Component } from 'react'

export default class SelectLevel extends Component {
    render() {
        return (
            <div>
                <select name="level" onChange={this.props.handleFilterLevel}>
                    <option value="">Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
        )
    }
}
