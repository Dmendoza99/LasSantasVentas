import React from "react";
import renderer from "react-test-renderer";

import Home from "../../views/Home";

describe("Home", () => {
  it("Rendered correctly", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
