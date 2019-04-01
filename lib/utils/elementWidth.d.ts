import { responsiveType } from "../types";
declare function getParitialVisibilityGutter(responsive: responsiveType, partialVisbile?: string | boolean, serverSideDeviceType?: string | undefined, clientSideDeviceType?: string | undefined): number | undefined;
declare function getWidthFromDeviceType(deviceType: string, responsive: responsiveType): number | string | undefined;
export { getWidthFromDeviceType, getParitialVisibilityGutter };
