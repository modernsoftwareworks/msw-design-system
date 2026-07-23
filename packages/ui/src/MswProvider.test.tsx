import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import { MswProvider } from "./MswProvider";

describe("MswProvider", () => {
	it("renders children inside the msw theme scope", () => {
		render(
			<MswProvider>
				<p>parchment</p>
			</MswProvider>,
		);
		const child = screen.getByText("parchment");
		expect(child).toBeInTheDocument();
		expect(child.closest('[data-astryx-theme="msw"]')).not.toBeNull();
	});
});
