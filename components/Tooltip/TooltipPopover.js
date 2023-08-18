import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const TooltipPopover = ({
  children,
  coords,
  updateTooltipCoords,
  tooltipRef,
  title
}) => {
  const updateCoords = debounce(updateTooltipCoords, 100);

  const contentRef = useRef();

  useEffect(() => {
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, []);

  const [styles, setStyles] = useState({
    position: 'absolute',
    visibility: 'hidden'
  });

  useLayoutEffect(() => {
    const measureWidth = () => {
      const width = contentRef.current.offsetWidth;
      let offset = width ? width / 2 : 0;
      // strange issue when its at max width
      if (offset > 200) offset = 200;
      setStyles({
        position: 'absolute',
        maxWidth: '400px',
        transform: `translate(-${offset}px, -100%)`
      });
    };

    // Introduce a delay before measuring
    const timeoutId = setTimeout(measureWidth, 5);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      style={{ ...styles, ...coords }}
      className="ant-popover ant-popover-placement-top"
      ref={tooltipRef}
    >
      <div className="ant-popover-content" ref={contentRef}>
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
