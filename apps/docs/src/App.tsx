import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { MswProvider, type MswMode } from '@msw-ds/ui';
import { DocShell } from './layout/DocShell';
import { Home } from './pages/Home';
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
            <Route path="/foundations" element={<Navigate to="/foundations/color" replace />} />
            <Route path="/foundations/color" element={<Color />} />
            <Route path="/foundations/typography" element={<Typography />} />
            <Route path="/foundations/space" element={<Space />} />
            <Route path="/foundations/shape" element={<Shape />} />
            <Route path="/foundations/elevation" element={<Elevation />} />
            <Route path="/foundations/motion" element={<Motion />} />
          </Routes>
        </DocShell>
      </BrowserRouter>
    </MswProvider>
  );
}
