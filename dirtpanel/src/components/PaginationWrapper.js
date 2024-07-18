import React, { Component, Fragment } from 'react';

class PaginationWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            numPages: 1,
            pageElements: []
        };

        this.updateListings = this.updateListings.bind(this);
    }

    componentDidMount() {
        this.updateListings();
    }

    updateListings() {
        let numPages = Math.ceil(this.props.elements.length / this.props.pageLength);
        numPages = numPages >= 1 ? numPages : 1;
        let page = this.state.page > numPages ? numPages : this.state.page;

        let startIndex = (page - 1) * this.props.pageLength;
        let elements = [];
        for (let i = 0; i < this.props.pageLength; i++) {
            let index = startIndex + i;
            if (index >= this.props.elements.length) break;
            elements.push(this.props.elements[index]);
        }

        this.setState({
            pageElements: elements,
            numPages: numPages,
            page: page
        });
    }

    render() {
        return (
            <Fragment>
                {
                    React.Children.map(this.props.children, child => React.cloneElement(child, { pageElements: this.state.pageElements, ...child.props }))
                }
                <div className="block-content block-content-full rounded-bottom">
                    <div className="row align-items-center">
                        <div className="col">
                            <p style={{ marginBottom: 'opx' }}>Page <b>{this.state.numPages > 0 ? this.state.page : '0'}</b> of <b>{this.state.numPages}</b></p>
                        </div>
                        <div className="col" align="right">
                            <button className="btn btn-secondary" disabled={this.state.page === 1} onClick={() => this.setState({ page: this.state.page - 1 }, () => this.updateListings())}>
                                <i className="fas fa-chevron-left" />
                            </button>
                            &nbsp;
                            <button className="btn btn-secondary" disabled={this.state.page >= this.state.numPages} onClick={() => this.setState({ page: this.state.page + 1 }, () => this.updateListings())}>
                                <i className="fas fa-chevron-right" />
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default PaginationWrapper;