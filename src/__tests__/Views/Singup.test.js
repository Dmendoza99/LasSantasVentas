import React from "react";
import renderer from "react-test-renderer";
import Signup from "../../views/Signup";

describe("Signup", () => {
  it("Rendered correctly", () => {
    const tree = renderer.create(<Signup />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
