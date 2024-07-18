import React, { Component } from 'react';

class ProgressBar extends Component {
    render() {
        return (
            <div className="mb-0">
                <div className="progress mb-1">
                    <div className={`progress-bar progress-bar-striped progress-bar-animated bg-${this.props.color}`} role="progressbar" style={{ width: `${this.props.percentFilled}%` }} aria-valuenow={this.props.percentFilled} aria-valuemin="0" aria-valuemax="100" />
                </div>
                <p className="font-size-sm font-w600 mb-0">
                    {this.props.children}
                </p>
            </div>
        );
    }
}

export default ProgressBar;