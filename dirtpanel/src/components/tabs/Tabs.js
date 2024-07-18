import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import ProtectedContent from '../ProtectedContent';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
        <div>
        <ul className="nav nav-tabs" data-toggle="tabs" role="tablist">
          {children.map((child) => {
            return (
              <ProtectedContent server={child.props.server} requiredRank={child.props.requiredRank} requireCheck={child.props.requireCheck} useHighestRank={child.props.useHighestRank} isConsole={child.props.isConsole} isFTP={child.props.isFTP}>
                <Tab
                  activeTab={activeTab}
                  key={child.props.label}
                  label={child.props.label}
                  onClick={onClickTabItem}
                />
              </ProtectedContent>
            );
          })}
        </ul>
        <div className="content content-full tab-content">
            <div className="tab-pane active" role="tabpanel">
              {children.map((child) => {
                if (child.props.label !== activeTab) return undefined;
                return child.props.children;
              })}
            </div>
        </div>
    </div>
    );
  }
}

export default Tabs;
