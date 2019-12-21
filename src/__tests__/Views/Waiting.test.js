import React from "react";
import renderer from "react-test-renderer";

import Waiting from "../../views/Waiting";

describe("Waiting", () => {
  it("Rendered correctly", () => {
    const tree = renderer.create(<Waiting />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
