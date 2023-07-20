import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "./home";

// const HomeScreen = require('./home');

describe("HomeScreen", () => {
  it("renders the tab view with two tabs", () => {
    const { findByTestId } = render(<HomeScreen />);
    
    // Check if the tab view component is rendered
    const tabView = findByTestId("tab-view");
    expect(tabView).toBeTruthy();
    
    // Check if there are two tabs rendered
    const tabs = getByTestId("tab");
    expect(tabs.length).toBe(2);
  });
});
