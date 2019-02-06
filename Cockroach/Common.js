"use strict";

class Common {
    /** 相対角度を求める */
    static rel_deg(dx, dy) {
        if((dx >= 0) && (dy >= 0)) {
            return Math.atan(dy / dx) / Math.PI * 180;
        } else if ((dx <= 0) && (dy >= 0)){
            return Math.atan(dy / dx) / Math.PI * 180 + 180;
        } else if ((dx < 0) && (dy < 0)){
            return Math.atan(dy / dx) / Math.PI * 180 + 180;
        } else if ((dx >= 0) && (dy <= 0)){
            return Math.atan(dy / dx) / Math.PI * 180 + 360;
        }
    }
}
