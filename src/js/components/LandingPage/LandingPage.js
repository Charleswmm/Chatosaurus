import React from 'react';
import '../../../scss/components/LandingPage/LandingPage.scss';

const LandingPage = () => {
  const loading = false;

  if (loading) {
    return (
      <div className="landing-page">
        <div className="landing-page-content">
          <div className="loading-content show-content">
            <div className="loading-img" />
            <div className="loading-text">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <div className="login-content show-content">
          <div className="svg svg-wumpus-direction" />
          <a className="login-button">
            <span>Login</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
