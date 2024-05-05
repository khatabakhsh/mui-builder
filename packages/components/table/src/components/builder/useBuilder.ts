import { BuilderProps } from './builder.types';

const useBuilder = (props: BuilderProps) => {
  const { tableType, tableProps } = props;

  const getSelectorProps = () => ({
    tableProps,
    tableType,
  });

  return { getSelectorProps };
};

export default useBuilder;
