import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { MswProvider, type MswMode } from '@modernsoftwareworks/msw-ui';
import { DocShell } from './layout/DocShell';
import { Home } from './pages/Home';
import { Principles } from './pages/Principles';
const GalleryPage = lazy(() =>
  import('./gallery/GalleryPage').then((m) => ({ default: m.GalleryPage })),
);
import { Color } from './pages/foundations/Color';
import { Typography } from './pages/foundations/Typography';
import { Space } from './pages/foundations/Space';
import { Shape } from './pages/foundations/Shape';
import { Elevation } from './pages/foundations/Elevation';
import { Motion } from './pages/foundations/Motion';

export function App() {
  const [mode, setMode] = useState<MswMode>('system');
  return (
    <MswProvider mode={mode}>
      <BrowserRouter>
        <DocShell mode={mode} onModeChange={setMode}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/principles" element={<Principles />} />
            <Route path="/foundations" element={<Navigate to="/foundations/color" replace />} />
            <Route path="/foundations/color" element={<Color />} />
            <Route path="/foundations/typography" element={<Typography />} />
            <Route path="/foundations/space" element={<Space />} />
            <Route path="/foundations/shape" element={<Shape />} />
            <Route path="/foundations/elevation" element={<Elevation />} />
            <Route path="/foundations/motion" element={<Motion />} />
            <Route path="/components" element={<Navigate to="/components/forms" replace />} />
            <Route
              path="/components/:slug"
              element={
                <Suspense fallback={null}>
                  <GalleryPage />
                </Suspense>
              }
            />
          </Routes>
        </DocShell>
      </BrowserRouter>
    </MswProvider>
  );
}
