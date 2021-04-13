import React from "react";
// import NormalUser from "../components/NormalUser";
// import Mod from "../components/Mod";
// import Admin from "../components/Admin";
import Navi from "../common/Navi";
import { useLoginValidate } from "../common/Validate";
import Loading from "../common/Loading";

export default function Main() {
  const { loading, userData } = useLoginValidate();
  // const role = userData ? userData.role : "";
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Navi></Navi>
      {/* {role === "visitor" && <NormalUser />}
      {role === "mod" && <Mod />}
      {role === "admin" && <Admin />} */}
    </div>
  );
}
