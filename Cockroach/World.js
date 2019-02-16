'use strict';

class World {
    constructor() {
		this._materials = [
    	new Cockroach( 1, -10, -10,  30, 'ジョセフィーヌ'),
			new Cockroach( 2,   0, -10,  60, 'クララ'),
			new Cockroach( 3,  10, -10,  90, 'クロエ'),
			new Cockroach( 4, -10,   0, 120, 'ヴィクトリア'),
			new Cockroach( 5,   0,   0, 150, 'ソフィア'),
			new Cockroach( 6,  10,   0, 180, 'エリス'),
			new Cockroach( 7, -10,  10, 210, 'アリシア'),
			new Cockroach( 8,   0,  10, 240, 'スザンヌ'),
			new Cockroach( 9,  10,  10, 270, 'オリヴィア'),
			new Cockroach(10, -10,  20, 300, 'メリッサ'),
			new Cockroach(11,   0,  20, 330, 'ローズ'),
			new Cockroach(12,  10,  20, 360, 'ガブリエル'),
	    	new Ball(13,  -10,  -20, 360, 'ベム'),
			new Ball(14,    0,  -20, 360, 'ベラ'),
			new Ball(15,   10,  -20, 360, 'ベロ'),
	    	new Material(16,   10,  -20, 360, 'ベロロロ'),
	    	new Material(17,   10,  -10, 360, 'ロロ'),

    	];
    }
    get materials() {return this._materials;}

	/** 当たり判定 */
    static collision(material) {
        let r = 2;          //あたり判定円大きさ
        let col_cnt = 0;    //あたり判定
        let col_deg = 0;    //あたり角度合計 falseの場合は衝突なし

        world.materials.forEach(function(other) {
            if (material == other) return;
            if (!World.inCircleRange(material, other, r)) return;

            let dx = material.x - other.x;
            let dy = material.y - other.y;

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
    static search(material) {
        let foundMaterials = [];
        world.materials.forEach(function(other) {
            if (material == other) return;
            if (!World.inCircleRange(material, other, World.detectionRange)) return;
            let tmp = [];
            tmp['id'] = other.id;
            tmp['rel_cood'] = World.calcRelativeDeg(material.r, World.calcAbsoluteDeg(material, other));
            foundMaterials.push(tmp);
        });

        return foundMaterials;
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
	static calcAbsoluteDeg(baseMaterial, targetMaterial) {
		let dx = baseMaterial.x - targetMaterial.x;
		let dy = baseMaterial.y - targetMaterial.y;

		return (Math.atan2(dy, dx) / Math.PI * 180 + 180) % 360;
	}

    /** 円範囲判定 */
    static inCircleRange(baseMaterial, targetMaterial, r) {
        let dx = baseMaterial.x - targetMaterial.x;
        let dy = baseMaterial.y - targetMaterial.y;
        let d = dx * dx + dy * dy;

        return d < r * r;
    }

    /** モード */
    static get mode() {return this._mode;}
    static set mode(val) {this._mode = val;}
    /** 検知範囲 */
    static get detectionRange() {return 20;}
}
