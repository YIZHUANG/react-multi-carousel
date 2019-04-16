import * as React from "react";
import { CarouselInternalState, CarouselProps, stateCallBack } from "./types";
interface DotsTypes {
    props: CarouselProps;
    state: CarouselInternalState;
    goToSlide: (index: number) => void;
    getState: () => stateCallBack;
}
declare const Dots: ({ props, state, goToSlide, getState }: DotsTypes) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export default Dots;
