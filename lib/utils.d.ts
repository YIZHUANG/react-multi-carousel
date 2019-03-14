import { responsiveType } from "./types";
declare function guessWidthFromDeviceType(deviceType: string, responsive: responsiveType): number | string | undefined;
declare function getParitialVisibilityGutter(responsive: responsiveType, partialVisbile?: string | boolean, serverSideDeviceType?: string | undefined, clientSideDeviceType?: string | undefined): number | undefined;
export { guessWidthFromDeviceType, getParitialVisibilityGutter };
