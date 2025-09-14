import { ComponentPropsWithoutRef, ElementType } from 'react';

import Button from './Button';
import { ICON_SIZES } from '../constants';

type ButtonProps<T extends ElementType> = {
  icon: 'archive' | 'block' | 'return';
  text: string;
} & ComponentPropsWithoutRef<T>;

const StatusButton = <T extends ElementType = 'button'>({
  icon,
  text,
  ...rest
}: ButtonProps<T>): React.JSX.Element => (
  <Button
    leftIcon={icon}
    sizeInPx={ICON_SIZES.SMALL}
    text={{
      color: 'purple',
      text,
      variant: 'link',
    }}
    {...rest}
  />
);

export default StatusButton;
