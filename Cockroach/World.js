'use strict';

class World {

    /** 当たり判定 */
    static collision(cockroach) {
        let r = 2;          //あたり判定円大きさ
        let col_cnt = 0;    //あたり判定
        let col_deg = 0;    //あたり角度合計 falseの場合は衝突なし

        cockroaches.forEach(function(other) {
            if (cockroach == other) return;
            if (!World.inCircleRange(cockroach, other, r)) return;

            let dx = cockroach.x - other.x;
            let dy = cockroach.y - other.y;

            //あたり角度を合算
            col_deg += Common.rel_deg(dx, dy);
            col_cnt += 1;
        });

        //複数点にあたった場合はその平均角度を返す
        if(col_cnt > 0) return col_deg / col_cnt;
        return false;
    }

    /** 
     * 引数で渡されたゴキを基準に見える範囲のゴキを探索
     * 見つけたゴキの角度を返却
     * 基準となるゴキの進行方向を0°、反時計回りに0°～360°角度が増える
     */
    static search(cockroach) {
        let foundCockroaches = [];
        cockroaches.forEach(function(other) {
            if (cockroach == other) return;
            if (!World.inCircleRange(cockroach, other, World.detectionRange)) return;
            let tmp = [];
            tmp['id'] = other.id;
            tmp['rel_cood'] = World.calcRelativeDeg(cockroach.r, World.calcAbsoluteDeg(cockroach, other));
            foundCockroaches.push(tmp);
        });

        return foundCockroaches;
    }

    /** 
     * 自身の向いてる方向を基準とした対象との角度を算出（対象との最短角度）
     * 引数:0度〜+359度の範囲
	 * 戻り値正数:反時計回り
	 * 戻り値負数:時計回り
     */
    static calcRelativeDeg(baseRDeg, targetRDeg) {
        let val = (targetRDeg - baseRDeg) % 360;
        //180度を超える場合は逆回りの角度を算出
        if (Math.abs(val) > 180) val = 360 - Math.abs(val);

        return val;
    }
    /** 
     * 基準ゴキの右を0度として対象ゴキ位置の角度を算出
     * 戻り値:0度〜+359度の範囲
     */
	static calcAbsoluteDeg(baseCockroach, targetCockroach) {
		let dx = baseCockroach.x - targetCockroach.x;
		let dy = baseCockroach.y - targetCockroach.y;

		return (Math.atan2(dy, dx) / Math.PI * 180 + 180) % 360;
	}

    /** 円範囲判定 */
    static inCircleRange(baseCockroach, targetCockroach, r) {
        let dx = baseCockroach.x - targetCockroach.x;
        let dy = baseCockroach.y - targetCockroach.y;
        let d = dx * dx + dy * dy;

        return d < r * r;
    }

    /** モード */
    static get mode() {return this._mode;}
    static set mode(val) {this._mode = val;}
    /** 検知範囲 */
    static get detectionRange() {return 20;}
}
