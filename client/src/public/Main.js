import React from "react";
import Navi from "../common/Navi";
import { useLoginValidate } from "../common/Validate";
import Loading from "../common/Loading";

export default function Main() {
  const { loading } = useLoginValidate();
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Navi></Navi>
      <div>set user.auth_id = 1 in db to enable admin page</div>
      <div>set user.status = 1 in db to activate registered account</div>
    </div>
  );
}
