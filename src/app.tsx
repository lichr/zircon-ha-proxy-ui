import { ThemeProvider, colors, createTheme } from '@mui/material';
import _ from 'lodash';
import { useMemo } from 'react';
import { PageContent } from './page/page-content';
import { PageConfigProvider, PageCoreProvider } from './services';


export function App(): JSX.Element {

  // theme
  const theme = useMemo(
    () => createTheme({
      palette: {
        primary: colors.blue
      }
    }),
    []
  );

  return (
    <PageConfigProvider url="page.json">
      <PageCoreProvider>
        <ThemeProvider theme={theme}>
          <PageContent />
        </ThemeProvider>
      </PageCoreProvider>
    </PageConfigProvider>
  );
}
