import React from 'react';

const Switch2 = ({ isOn, handleToggle, onColor}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new2`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && onColor }}
        className="react-switch-label"
        htmlFor={`react-switch-new2`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch2;