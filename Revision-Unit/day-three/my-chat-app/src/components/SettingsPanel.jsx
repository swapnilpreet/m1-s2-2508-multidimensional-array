import React, { useState } from "react";

const SettingsPanel = React.memo(function SettingsPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div className="settings-wrap">
      <button className="settings-btn" onClick={() => setOpen((v) => !v)}>
        {open ? "Close Settings" : "Open Settings"}
      </button>
      {open && (
        <div className="settings-box">
          <div>dummy setting 1</div>
          <div>dummy setting 2</div>
        </div>
      )}
    </div>
  );
});

export default SettingsPanel;
