import { describe, expect, it } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { MswProvider } from "@modernsoftwareworks/msw-ui/provider";
import { DocShell } from "./DocShell";

function renderShell(path = "/") {
  return render(
    <MswProvider mode="light">
      <MemoryRouter initialEntries={[path]}>
        <DocShell mode="light" onModeChange={() => {}}>
          <h1>Page title</h1>
        </DocShell>
      </MemoryRouter>
    </MswProvider>,
  );
}

describe("DocShell", () => {
  it("exposes a skip link to main content", () => {
    renderShell();
    const skip = screen.getByRole("link", { name: /skip to content/i });
    expect(skip).toHaveAttribute("href", "#main");
    expect(document.getElementById("main")).not.toBeNull();
  });

  it("marks the active nav item with aria-current=page", () => {
    renderShell("/principles");
    const principles = screen.getByRole("link", { name: "Principles" });
    expect(principles).toHaveAttribute("aria-current", "page");
  });

  it("labels the documentation nav and color mode control", () => {
    renderShell();
    expect(screen.getByRole("navigation", { name: "Documentation" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /color mode/i })).toBeInTheDocument();
  });
});
