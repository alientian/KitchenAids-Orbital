import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import App from "./recipes";

describe("App", () => {
  it("fetches and displays recipes from the API", async () => {
    const mockResponse = {
      hits: [
        {
          recipe: {
            label: "Recipe 1",
            ingredientLines: ["Ingredient 1"],
          },
        },
        {
          recipe: {
            label: "Recipe 2",
            ingredientLines: ["Ingredient 2"],
          },
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const { findByText } = render(<App />);

    await waitFor(() => {
      expect(findByText("Recipe 1")).toBeTruthy();
      expect(findByText("Recipe 2")).toBeTruthy();
    });
  });
});
