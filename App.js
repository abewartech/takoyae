import * as React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {Provider} from 'mobx-react';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {RootStore} from './store/';
import {AppNavigator} from './navigation.component';

const rootStore = new RootStore();
export default () => (
  <>
  <Provider rootStore={rootStore}>
  <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppNavigator />
    </ApplicationProvider>
  </Provider>
  </>
);
