"use strict";

/** 当たり判定 */
function colision(cockroach) {
    let r = 2;          //あたり判定円大きさ
    let col_cnt = 0;    //あたり判定
    let col_deg = 0;    //あたり角度合計 falseの場合は衝突なし
    for (let i in cockroaches) {
        if (cockroach == cockroaches[i]) continue;
        let dx = cockroach.x - cockroaches[i].x;
        let dy = cockroach.y - cockroaches[i].y;

        //半径よりおおきければOK
        let d = dx * dx + dy * dy;
        if (d > r * r) continue;

        //あたり各
        col_deg += rel_deg(dx, dy);
        col_cnt += 1;
    }
    if(col_cnt > 0) return col_deg / col_cnt;
    return false;
}

/** 相対角度を求める */
function rel_deg(dx, dy) {

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
