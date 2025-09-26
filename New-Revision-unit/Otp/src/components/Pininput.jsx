import React from "react";
import { forwardRef } from "react";

const Pininput = forwardRef(({ changehandler, onbackspacehandler }, ref) => {
  const handlekeyup = (e) => {
    console.log(e);
    if (e.keyCode === 8) {
      onbackspacehandler(e);
    } else {
      changehandler(e);
    }
  };
  return (
    <div>
      <input ref={ref} maxLength={1} onKeyUp={handlekeyup} />
    </div>
  );
});

export default Pininput;
