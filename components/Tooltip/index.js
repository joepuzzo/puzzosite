import React, { useRef, useState } from "react";
import TooltipPopover from "./TooltipPopover";
import Portal from "./Portal";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const Info = ({ifoRef, ...props}) => {
  return (
    <div className="info" ref={ifoRef} {...props} >
      <small className="infoIcon">i</small>
    </div>
  );
};

export const Tooltip = ({ children, title }) => {
  const [isOn, setOn] = useState(false); // toggles dropdown visibility
  const [coords, setCoords] = useState({}); // takes current button coordinates
  const triggerElem = useRef();
  const tooltipRef = useRef();

  useOutsideAlerter(()=> setOn(false), tooltipRef, triggerElem);

  const updateTooltipCoords = (button) => {
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2, // add half the width of the button for centering
      top: rect.y + window.scrollY - 10 // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });
  };

  return (
    <div className="mobile ml-1">
      <Info
        ifoRef={triggerElem}
        onClick={(e) => {
          updateTooltipCoords(e.target);
          setOn(!isOn);
        }}
      />
      {isOn && (
        <Portal>
          <TooltipPopover
            coords={coords}
            tooltipRef={tooltipRef}
            title={title}
            updateTooltipCoords={() =>
              updateTooltipCoords(btnRef.current.buttonNode)
            }
          >
            <div>
              {children}
            </div>
          </TooltipPopover>
        </Portal>
      )}
    </div>
  );
};