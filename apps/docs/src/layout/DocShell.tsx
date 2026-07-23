import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";
import type { MswMode } from "@modernsoftwareworks/msw-ui";
import "./docshell.css";

const NAV: Array<{ heading: string; links: Array<{ to: string; label: string }> }> = [
	{
		heading: "Overview",
		links: [
			{ to: "/", label: "Home" },
			{ to: "/principles", label: "Principles" },
		],
	},
	{
		heading: "Foundations",
		links: [
			{ to: "/foundations/color", label: "Color" },
			{ to: "/foundations/typography", label: "Typography" },
			{ to: "/foundations/space", label: "Space" },
			{ to: "/foundations/shape", label: "Shape" },
			{ to: "/foundations/elevation", label: "Elevation" },
			{ to: "/foundations/motion", label: "Motion" },
		],
	},
	{
		heading: "Components",
		links: [
			{ to: "/components/forms", label: "Forms & Inputs" },
			{ to: "/components/data", label: "Data Display" },
			{ to: "/components/overlays", label: "Overlays & Feedback" },
			{ to: "/components/navigation", label: "Navigation & Search" },
			{ to: "/components/layout", label: "Layout & Structure" },
			{ to: "/components/content", label: "Content & Typography" },
			{ to: "/components/media", label: "Media & Communication" },
		],
	},
];

const MODE_ORDER: MswMode[] = ["system", "light", "dark"];
const MODE_LABEL: Record<MswMode, string> = { system: "Auto", light: "Light", dark: "Dark" };

export function DocShell({
	mode,
	onModeChange,
	children,
}: PropsWithChildren<{ mode: MswMode; onModeChange: (mode: MswMode) => void }>) {
	const nextMode = MODE_ORDER[(MODE_ORDER.indexOf(mode) + 1) % MODE_ORDER.length];
	return (
		<div className="shell">
			<a className="skip-link" href="#main">
				Skip to content
			</a>
			<aside className="sidebar">
				<div className="wordmark">
					<span className="wordmark-name">MSW</span>
					<span className="wordmark-sub">Design System</span>
				</div>
				<nav className="sidenav" aria-label="Documentation">
					{NAV.map((group) => (
						<div className="nav-group" key={group.heading}>
							<div className="nav-heading">{group.heading}</div>
							{group.links.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
								>
									{link.label}
								</NavLink>
							))}
						</div>
					))}
				</nav>
				<div className="sidebar-foot">
					<button
						type="button"
						className="mode-toggle"
						onClick={() => onModeChange(nextMode)}
						aria-label={`Color mode: ${MODE_LABEL[mode]}. Switch to ${MODE_LABEL[nextMode]}.`}
					>
						{MODE_LABEL[mode]}
					</button>
				</div>
			</aside>
			<main className="main" id="main">
				<div className="prose">{children}</div>
			</main>
		</div>
	);
}
