import { CarouselInternalState, CarouselProps } from "./types";
interface CarouselItemsProps {
    props: CarouselProps;
    state: CarouselInternalState;
    goToSlide: (index: number) => void;
}
declare const CarouselItems: ({ props, state, goToSlide }: CarouselItemsProps) => any;
export default CarouselItems;
