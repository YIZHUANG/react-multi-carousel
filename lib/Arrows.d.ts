import * as React from 'react';
import { stateCallBack } from './types';
interface LeftArrowProps {
    customLeftArrow?: React.ReactElement<any> | null;
    getState: () => stateCallBack;
    previous: () => void;
}
interface RightArrowProps {
    customRightArrow?: React.ReactElement<any> | null;
    getState: () => stateCallBack;
    next: () => void;
}
declare const LeftArrow: ({ customLeftArrow, getState, previous }: LeftArrowProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
declare const RightArrow: ({ customRightArrow, next, getState }: RightArrowProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export { LeftArrow, RightArrow };
