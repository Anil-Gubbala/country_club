import React from "react";
import { useLoginValidate } from "./Validate";

const loginContext = React.createContext();

export default function BasePage(props) {
    const {userData} = useLoginValidate();
  return (
    <loginContext.Provider value = {userData}>
      <div className="main">{props.children}</div>
    </loginContext.Provider>
  );
}
export {loginContext};
