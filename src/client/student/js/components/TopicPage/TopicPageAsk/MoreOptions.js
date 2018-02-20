import React from 'react';
import PropTypes from 'prop-types';

import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import HelpIcon from 'material-ui/svg-icons/action/help';
import Divider from 'material-ui/Divider/Divider';

import colors from '~/shared/js/constants/colors';

const style = {
  button: {
    // make button on same level as ask button
    position: 'relative',
    top: 5,
  },
  wrap: {
    marginLeft: 10,
  },
  text: {
    fontSize: 12,
  },
  checkBox: {
    width: 12,
    height: 12,
  },
  // make helpIconWrap not affect positioning
  helpIconWrap: {
    height: 0,
    width: 0,
    top: 0,
    margin: 0,
    right: 0,
  },
  // apply positiong to icon
  helpIcon: {
    height: 24,
    width: 24,
    display: 'block',
    position: 'absolute',
    top: 0,
    margin: 12,
    right: 4,
  },
};

function renderMenuItem(primaryText, onclick, checked, helpText, key) {
  return (
    <MenuItem
      key={ key }
      primaryText={ primaryText }

      onClick={ onclick }
      checked={ checked }

      leftIcon={
        // show invisible icon if unchecked to keep all items aligned
        !checked ? <ExpandMoreIcon color="transparent" /> : null
      }
      rightIcon={
        <span title={ helpText } style={ style.helpIconWrap }>
          <HelpIcon style={ style.helpIcon } color={ colors.gray } />
        </span>
      }

    />
  );
}

// MoreOptions is used in AskForm and AskList
class MoreOptions extends React.Component {

  static propTypes = {
    private: PropTypes.bool.isRequired,
    named: PropTypes.bool.isRequired,

    handlePrivateClick: PropTypes.func.isRequired,
    handlePublicClick: PropTypes.func.isRequired,
    handleNamedClick: PropTypes.func.isRequired,
    handleUnnamedClick: PropTypes.func.isRequired,
  }

  // MoreOptions keep ui state and passes data state to parent
  state = {
    open: false,
    anchorEl: null, // anchorEl is set to iconbutton when iconbutton is clicked
  }

  handleOpenClick = e => {
    this.setState({ open: true, anchorEl: e.currentTarget });
  }
  handleRequestClose = () => {
    this.setState({ open: false });
  }

  render() {

    const helpTexts = {
      public: 'Public questions are shown to teachers and other transfer students',
      private: 'Private questions are only shown to your teachers',
      nammed: 'Your teachers can see who asked "Name Shown" questions',
      unnamed: 'Nobody can see who asked "Name Hidden" questions',
    };

    /* eslint-disable max-len */

    const menuItems = [
      renderMenuItem('Public', this.props.handlePublicClick, !this.props.private, helpTexts.public, 0),
      renderMenuItem('Private', this.props.handlePrivateClick, this.props.private, helpTexts.private, 1),
      <Divider key={ 2 } />,
      renderMenuItem('Name Shown', this.props.handleNamedClick, this.props.named, helpTexts.nammed, 3),
      renderMenuItem('Name Hidden', this.props.handleUnnamedClick, !this.props.named, helpTexts.unnamed, 4),
    ];

    /* eslint-enable max-len */

    return (
      <span>
        <IconButton
          onClick={ this.handleOpenClick }
          style={ style.button }
        >
          <ExpandMoreIcon color={ colors.gray } />
        </IconButton>

        <Popover
          open={ this.state.open }
          anchorEl={ this.state.anchorEl }
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={ this.handleRequestClose }
        >
          <Menu>{ menuItems }</Menu>
        </Popover>
      </span>
    );
  }

}

export default MoreOptions;
