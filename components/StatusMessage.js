import React from 'react';

const Info = () => {
  return (
    <div className="info">
      <small className="infoIcon">i</small>
    </div>
  );
};

export const StatusMessage = ({
  children,
  alwaysShow,
  title = 'Info',
  icon
}) => {
  return (
    <div className={`status-message ${!alwaysShow ? 'not-mobile' : ''}`}>
      <div
        style={{
          display: 'flex',
          marginBottom: '10px'
        }}
      >
        {icon ? icon : <Info />}
        <strong>{title}</strong>
      </div>
      <small>{children}</small>
    </div>
  );
};
