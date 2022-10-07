import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const emailMD = md5(email).toString();
    return (
      <>
        <div>Header</div>
        <div>
          <img src={ `https://www.gravatar.com/avatar/${emailMD}` } alt="img" data-testid="header-profile-picture" />
          <span data-testid="header-player-name">
            { name }
          </span>
          <span data-testid="header-score">0</span>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
