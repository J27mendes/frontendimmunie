import React from "react";

import Header from "./components/header/Header";
import Divider from "./components/divider/Divider";
import Form from "./components/form/Form";

export default function Home() {
  return (
    <div className="bg-green">
      <Header />
      <Divider />
      <Form />
    </div>
  );
}
