import { responsiveType } from "./types";

function guessWidthFromDeviceType(
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

function getParitialVisibilityGutter(
  responsive: responsiveType,
  partialVisbile?: string | boolean,
  serverSideDeviceType?: string | undefined,
  clientSideDeviceType?: string | undefined
):number | undefined {
  let gutter:number | undefined = 0;
  const deviceType = clientSideDeviceType || serverSideDeviceType
  if(partialVisbile && deviceType) {
    gutter = responsive[deviceType].paritialVisibilityGutter
  }
  return gutter;
}
export { guessWidthFromDeviceType, getParitialVisibilityGutter };
