import * as React from 'react';

import { stateCallBack } from './types';

interface LeftArrowProps {
  customLeftArrow?: React.ReactElement<any> | null,
  getState: () => stateCallBack;
  previous: () => void;
}
interface RightArrowProps {
  customRightArrow?: React.ReactElement<any> | null,
  getState: () => stateCallBack;
  next: () => void;
}

const LeftArrow = ({ customLeftArrow, getState, previous }:LeftArrowProps): React.ReactElement<any> => {
  if (customLeftArrow) {
    return React.cloneElement(customLeftArrow, {
      onClick: () => previous(),
      carouselState: getState()
    });
  }
  return (
    <button
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
      onClick={() => previous()}
    />
  )
}
const RightArrow = ({ customRightArrow, next, getState }:RightArrowProps): React.ReactElement<any> => {
  if (customRightArrow) {
    return React.cloneElement(customRightArrow, {
      onClick: () => next(),
      carouselState: getState()
    });
  }
  return (
    <button
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
      onClick={() => next()}
    />
  );
}

export { LeftArrow, RightArrow }
