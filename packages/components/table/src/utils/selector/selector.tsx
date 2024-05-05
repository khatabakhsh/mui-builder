import { FC, Fragment, Suspense, lazy } from 'react';

import { SelectorProps } from './selector.types';

const Selector: FC<SelectorProps> = ({ tableType, tableProps }) => {
  let SelectedComponent;

  switch (tableType) {
    case 'table':
      SelectedComponent = lazy(
        () => import('../../components/table/index')
      );

      return (
        <Suspense fallback={<div>Loading...</div>}>
          <SelectedComponent {...(tableProps)} />
        </Suspense>
      );

    default:
      SelectedComponent = Fragment;

      return (
        <Suspense fallback={<div>Loading...</div>}>
          <SelectedComponent />
        </Suspense>
      );
  }
};
export default Selector;
