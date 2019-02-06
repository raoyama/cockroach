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

    static getRandomInt(max) {
        let rand = Math.floor(Math.random() * Math.floor(max));

        if(Math.random() < 0.5) {
            rand *= -1;
        }
        
        return rand;
}

}
