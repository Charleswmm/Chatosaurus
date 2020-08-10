import PropTypes from 'prop-types';
import React from 'react';
import '../../../scss/components/Loading/Loading.scss';

const Loading = ({ location }) => {
  const { state } = location;
  const defaultState = {
    loading: true,
    error: '',
  };

  // Check there is something in state, if not, use the above default
  const getState = state || defaultState;
  const { loading, error } = getState;

  if (!loading || error) {
    return <></>;
  }

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <div className="loading-content">
          <div className="loading-img" />
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Loading.defaultProps = {
  location: null,
};

export default Loading;
