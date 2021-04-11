import React from "react";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import redirectHome from "../common/redirectHome";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";

export default function AdminHome() {
  const { loading, userData } = useLoginValidate();
  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }
  if (!userData.username) {
    return redirectLogin();
  } else if (userData.role === "admin") {
    return (
      <BasePage>
      <Navi></Navi>
        <div>Add admin content</div>
      </BasePage>
    );
  } else {
    return redirectHome();
  }
}
