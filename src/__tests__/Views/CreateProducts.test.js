import React from "react";
import renderer from "react-test-renderer";

import CreateProducts from "../../views/CreateProducts";

describe("CreateProducts", () => {
  it("Rendered correctly", () => {
    const tree = renderer.create(<CreateProducts />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
