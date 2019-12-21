import React from "react";
import renderer from "react-test-renderer";

import ListProducts from "../../views/ListProducts";

describe("ListProducts", () => {
  it("Rendered correctly", () => {
    const tree = renderer.create(<ListProducts />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
