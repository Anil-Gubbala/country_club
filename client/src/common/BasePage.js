import React from "react";
export default function BasePage(props) {
  return (
      <div className="main">{props.children}</div>
  );
}
