'use strict';

class Common {
    /** 相対角度を求める */
    static rel_deg(dx, dy) {
		//console.log('rel_deg === ' + dx + ':' + dy);
    	let ret = (Math.atan2(dy, dx) / Math.PI * 180 + 360) % 360;
		//console.log(ret);
		return ret;
    }

    static getRandomInt(max) {
        let rand = Math.floor(Math.random() * Math.floor(max));

        if(Math.random() < 0.5) {
            rand *= -1;
        }
        
        return rand;
	}

	/** ベクトル平均 */
	static avg_vec(dirs) {
		let dx = 0;
		let dy = 0;
		for (let dir of dirs) {
			dx += Math.cos(dir * Math.PI / 180);
			dy += Math.sin(dir * Math.PI / 180);
			//console.log(dir+ ':' + dx + ':' + dy);
		}
//		console.log(Common.rel_deg(dx, dy));

		return Common.rel_deg(dx, dy);
	}

	/** 配列から特定のキーの配列を返す */
	static array_column(array, key) {
		let ret = [];
		for (let hash of array) {
			ret.push(hash[key]);
		}

		return ret;
	}
}
