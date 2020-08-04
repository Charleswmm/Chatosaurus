import PropTypes from 'prop-types';
import React from 'react';

const ErrorPage = ({ location }) => {
  const { state } = location;

  // Check if the pages was redirected with an error
  const error = state ? state.error : '404';

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <div className="error-text">{`Error: ${error}`}</div>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ErrorPage.defaultProps = {
  location: null,
};

export default ErrorPage;
