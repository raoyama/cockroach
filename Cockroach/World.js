'use strict';

class World {
    /** 当たり判定 */
    static collision(cockroach) {
        let r = 2;          //あたり判定円大きさ
        let col_cnt = 0;    //あたり判定
        let col_deg = 0;    //あたり角度合計 falseの場合は衝突なし
        for (let i in cockroaches) {
            if (cockroach == cockroaches[i]) continue;
            let dx = cockroach.x - cockroaches[i].x;
            let dy = cockroach.y - cockroaches[i].y;
//            let dx = cockroaches[i].x - cockroach.x;
//            let dy = cockroaches[i].y - cockroach.y;

            //半径よりおおきければOK
            let d = dx * dx + dy * dy;
            if (d > r * r) continue;

            //あたり角度を合算
            col_deg += Common.rel_deg(dx, dy);
            col_cnt += 1;
        }
        //複数点にあたった場合はその平均角度を返す
        if(col_cnt > 0) return col_deg / col_cnt;
        return false;
    }

    /** モード */
    static get mode() {return this._mode;}
    static set mode(val) {this._mode = val;}
}
