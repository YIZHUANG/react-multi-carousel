import { responsiveType, CarouselInternalState, CarouselProps } from "../types";

function getParitialVisibilityGutter(
  responsive: responsiveType,
  partialVisbile?: boolean,
  serverSideDeviceType?: string | undefined,
  clientSideDeviceType?: string | undefined
): number | undefined {
  let gutter: number | undefined = 0;
  const deviceType = clientSideDeviceType || serverSideDeviceType;
  if (partialVisbile && deviceType) {
    gutter = responsive[deviceType].paritialVisibilityGutter;
  }
  return gutter;
}

function getWidthFromDeviceType(
  deviceType: string,
  responsive: responsiveType
): number | string | undefined {
  let itemWidth;
  if (responsive[deviceType]) {
    const { items } = responsive[deviceType];
    itemWidth = (100 / items).toFixed(1);
  }
  return itemWidth;
}

function getItemClientSideWidth(
  props: CarouselProps,
  slidesToShow: number,
  containerWidth: number
):number {
  return Math.round(
    containerWidth / (slidesToShow + (props.centerMode ? 1 : 0))
  );
}

export {
  getWidthFromDeviceType,
  getParitialVisibilityGutter,
  getItemClientSideWidth
};
