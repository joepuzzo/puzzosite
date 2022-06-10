import React, { useEffect } from "react";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const styles = {
  popover: {
    position: "absolute",
    width: 400,
    transform: "translate(-200px, -100%)"
  }
};

const TooltipPopover = ({ children, coords, updateTooltipCoords, tooltipRef, title }) => {
  const updateCoords = debounce(updateTooltipCoords, 100);

  useEffect(() => {
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, []);

  return (
    <div
      style={{ ...styles.popover, ...coords }}
      className="ant-popover ant-popover-placement-top"
      ref={tooltipRef}
    >
      <div className="ant-popover-content">
        <div className="ant-popover-arrow" />
        <div className="ant-popover-inner" role="tooltip">
          <div>
            {/* <div className="ant-popover-title"><strong>{title}</strong></div> */}
            <div className="ant-popover-inner-content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TooltipPopover;
