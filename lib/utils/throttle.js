"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var throttle = function (func, limit, setIsInThrottle) {
    var inThrottle;
    return function () {
        var args = arguments;
        var context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            if (typeof setIsInThrottle === "function") {
                setIsInThrottle(true);
            }
            setTimeout(function () {
                inThrottle = false;
                if (typeof setIsInThrottle === "function") {
                    setIsInThrottle(false);
                }
            }, limit);
        }
    };
};
exports.default = throttle;
//# sourceMappingURL=throttle.js.map