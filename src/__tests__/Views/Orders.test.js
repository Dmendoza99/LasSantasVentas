import React from "react";
import renderer from "react-test-renderer";

import Orders from "../../views/Orders";

describe("Orders", () => {
  it("Rendered correctly", () => {
    const tree = renderer.create(<Orders />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
