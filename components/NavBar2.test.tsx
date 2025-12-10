import { fireEvent, screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

import NavBar2 from "./NavBar2";

// Mock the entire next/navigation module
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("NavBar2", () => {
  it("renders without crashing", () => {
    render(<NavBar2 />);
    expect(screen.getByText("Björn Urban")).toBeInTheDocument();
  });

  it("toggles menu when button is clicked", async () => {
    // Set the viewport to a mobile size
    window.dispatchEvent(new Event("resize"));

    const { container } = render(<NavBar2 />);
    const button = screen.getByRole("button", { name: "Open main menu" });

    // Initial check - ensure menu is initially not displayed for mobile
    // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
    const menu = container.querySelector('div[id="navbar-sticky"]');
    expect(menu).toHaveClass("hidden"); // The menu should be hidden on initial render in mobile view

    // Click the button to open the menu
    fireEvent.click(button);
    // Now, the menu should be visible in mobile view
    // Checking for absence of 'hidden' might not suffice if 'hidden' is not toggled. Check for visible class or style directly.
    expect(menu).not.toHaveClass("hidden"); // Adjust this based on how your CSS is applied

    // Click the button again to close the menu
    fireEvent.click(button);
    // Menu should be hidden again in mobile view
    expect(menu).toHaveClass("hidden");
  });

  it("renders navigation links", () => {
    render(<NavBar2 />);
    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });
});
