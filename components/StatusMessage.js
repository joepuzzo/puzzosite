import React from 'react';

const Info = () => {
  return <div className="info"><small className="infoIcon">i</small></div>
}

export const StatusMessage = ({ children }) => {
  return (
    <div style={{
      width: '100%',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      padding: '30px',
      backgroundColor: '#f4f4f4',
      marginTop: '10px',
      marginBottom: '10px',
      // textAlign: 'center',
      maxWidth: '500px'
      // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
    }} className="not-mobile">
      <div style={{
        display: 'flex',
        marginBottom: '10px'
      }}>
        <Info />
        <strong>
          Info 
        </strong>
      </div>
      <small>
        {children}
      </small>
    </div>
  )
};