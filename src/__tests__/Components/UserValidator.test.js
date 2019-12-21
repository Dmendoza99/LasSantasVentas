import React from "react";
import renderer from "react-test-renderer";

import UserValidator from "../../components/UserValidator";

describe("UserValidator", () => {
  it("Rendered correctly", () => {
    const tree = renderer.create(<UserValidator />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
