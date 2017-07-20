import React from 'react';

import Header from './Header/';
import Sidebar from './Sidebar';
import Feedback from '../Feedback';

import '../../../css/layout.css';

const styles = {
  main(props) {
    let style = {
      width: '85%',
      paddingTop: 8,
    };
    if (props.open) {
      style.float = 'right';
    } else {
      style.marginRight = 'auto';
      style.marginLeft = 'auto';
    }
    return style;
  },
};

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      sidebar: { open: false },
    };
  }
  openSidebar() {
    this.setState({ sidebar: { open: true } });
  }
  closeSidebar() {
    this.setState({ sidebar: { open: false } });
  }
  render() {
    return (
      <div className="layout">
        <Header handleIconClick={ this.openSidebar.bind(this) } />
        <Sidebar
          items={ this.props.sidebarItems }
          open={ this.state.sidebar.open }
          location={ this.props.location }
          onItemClick={ this.closeSidebar.bind(this) }
          onRequestChange={ this.closeSidebar.bind(this) }
        />
        <Feedback />
        <main style={ styles.main(this.props) }>
          { this.props.children }
        </main>
      </div>
    );
  }
}

export default Layout;
