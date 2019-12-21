import React from "react";
import renderer from "react-test-renderer";

import Settings from "../../views/Settings";

describe("Settings", () => {
  it("Rendered correctly", () => {
    const tree = renderer.create(<Settings />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
