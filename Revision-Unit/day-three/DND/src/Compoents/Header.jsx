import React from "react";

const Header = ({ text, bg, count, countbg }) => {
  return (
    <div className={`header ${bg}`}>
      {text}
      <div className={`header-count ${countbg}`}>{count}</div>
    </div>
  );
};

export default Header;
