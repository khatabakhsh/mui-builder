import convertFn from '@mui-builder/utils/convertFn/convertFn';
import isStrFn from '@mui-builder/utils/isStrFn/isStrFn';

import { Validate } from '../../types/validation.types';
import {
  UseRoleProps,
  UseRoleReturn,
  ValidateBuilderProps,
} from './useRule.types';

const useRule = (rule?: UseRoleProps): UseRoleReturn => {
  if (!rule) return undefined;

  const { validate, ...otherRules } = rule;

  const validateBuilder = (props: ValidateBuilderProps) => {
    const [value, formValues] = props;
    if (isStrFn(validate))
      return convertFn<Validate>(
        validate as string,
        'value',
        'formValues'
      )(value, formValues);

    return (validate as Validate)(value, formValues);
  };

  return {
    ...otherRules,
    validate: (value, formValues) => validateBuilder([value, formValues]),
  };
};

export default useRule;
