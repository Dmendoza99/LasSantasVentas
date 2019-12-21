import React from "react";
import renderer from "react-test-renderer";

import Login from "../../views/Login";

describe("Login", () => {
  it("Rendered correctly", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
