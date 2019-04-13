import { responsiveType, CarouselProps } from "../types";
declare function getParitialVisibilityGutter(responsive: responsiveType, partialVisbile?: boolean, serverSideDeviceType?: string | undefined, clientSideDeviceType?: string | undefined): number | undefined;
declare function getWidthFromDeviceType(deviceType: string, responsive: responsiveType): number | string | undefined;
declare function getItemClientSideWidth(props: CarouselProps, slidesToShow: number, containerWidth: number): number;
export { getWidthFromDeviceType, getParitialVisibilityGutter, getItemClientSideWidth };
