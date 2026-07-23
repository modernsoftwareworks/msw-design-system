import type { PropsWithChildren } from 'react';
import { Theme } from '@astryxdesign/core';
import { mswTheme } from '@msw-ds/theme';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@msw-ds/theme/css';

export type MswMode = 'system' | 'light' | 'dark';

export function MswProvider({
  children,
  mode = 'system',
}: PropsWithChildren<{ mode?: MswMode }>) {
  return (
    <Theme theme={mswTheme} mode={mode}>
      {children}
    </Theme>
  );
}
