import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Register from "./register";
import { supabase } from "../../lib/supabase";

jest.mock("../../lib/supabase", () => ({
    supabase: {
      auth: {
        signUp: jest.fn().mockResolvedValue({ error: null }),
      },
    },
  }));

describe("Register", () => {
    it("submits the form with valid email and password", async () => {
        const { getByText, getByPlaceholderText } = render(<Register />);
        
        // Fill in the email and password fields
        const emailInput = getByPlaceholderText("Email");
        const passwordInput = getByPlaceholderText("Password");
        fireEvent.changeText(emailInput, "test@example.com");
        fireEvent.changeText(passwordInput, "password123");
        
        // Submit the form
        const submitButton = getByText("Submit");
        fireEvent.press(submitButton);
        
        // Wait for the form submission to complete
        await waitFor(() => {
          expect(supabase.auth.signUp).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
          });
        });
        
        // // Check for any error message
        // expect(getByText("")).not.toBeVisible();
    });

  it("displays an error message for empty email", async () => {
    const { getByText } = render(<Register />);
    
    // Submit the form without filling in email and password
    const submitButton = getByText("Submit");
    fireEvent.press(submitButton);
    
    // Check for the error messages
    await waitFor(() => {
      expect(getByText("Email cannot be empty")).toBeVisible();
    });
  });

  it("displays an error message for empty password", async () => {
    const { getByText, getByPlaceholderText } = render(<Register />);
        
    // Fill in the email field
    const emailInput = getByPlaceholderText("Email");
    fireEvent.changeText(emailInput, "test@example.com");
   
    // Submit the form without filling in password
    const submitButton = getByText("Submit");
    fireEvent.press(submitButton);
    
    // Check for the error messages
    await waitFor(() => {
      expect(getByText("Password cannot be empty")).toBeVisible();
    });
  });
});
