import _ from 'lodash';
import { PageConfigProvider, PageCoreProvider } from './services';

export function App(): JSX.Element {
  return (
    <PageConfigProvider url="page.json">
      <PageCoreProvider>
        <div>Hello</div>
      </PageCoreProvider>
    </PageConfigProvider>
  );
}
