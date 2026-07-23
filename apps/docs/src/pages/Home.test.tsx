import { describe, expect, it } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MswProvider } from "@modernsoftwareworks/msw-ui/provider";
import { Home } from "./Home";

describe("Home", () => {
  it("renders a single document h1 and paths into the system", () => {
    render(
      <MswProvider mode="light">
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </MswProvider>,
    );
    const title = screen.getByRole("heading", { level: 1, name: "MSW Design System" });
    expect(title).toBeInTheDocument();
    expect(title.closest(".page-header-display")).not.toBeNull();
    expect(screen.getByRole("link", { name: /Principles/i })).toHaveAttribute(
      "href",
      "/principles",
    );
    expect(screen.getByRole("link", { name: /Foundations/i })).toHaveAttribute(
      "href",
      "/foundations/color",
    );
    expect(screen.getByRole("link", { name: /Components/i })).toHaveAttribute(
      "href",
      "/components/forms",
    );
  });
});
