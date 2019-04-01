import { CarouselInternalState, CarouselProps } from "./types";
interface CarouselItemsProps {
    props: CarouselProps;
    state: CarouselInternalState;
}
declare const CarouselItems: ({ props, state }: CarouselItemsProps) => any;
export default CarouselItems;
