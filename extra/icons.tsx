import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const CloseIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='close-outline' />
);

export const MinusIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='minus-outline' />
);

export const PlusIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='plus' />
);


