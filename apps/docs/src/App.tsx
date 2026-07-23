import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { MswProvider, type MswMode } from '@msw-ds/ui';
import { DocShell } from './layout/DocShell';
import { Home } from './pages/Home';

export function App() {
  const [mode, setMode] = useState<MswMode>('system');
  return (
    <MswProvider mode={mode}>
      <BrowserRouter>
        <DocShell mode={mode} onModeChange={setMode}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </DocShell>
      </BrowserRouter>
    </MswProvider>
  );
}
