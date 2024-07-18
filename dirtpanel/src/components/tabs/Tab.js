import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }


  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let className = 'nav-link nav-tab-hand';

    if (activeTab === label) {
      className += ' active';
    }

    return (
      <li className="nav-item">
        <a className={className} onClick={onClick} href="#/">
          {label}
        </a>
      </li>
    );
  }
}

export default Tab;
