'use strict';

class Common {
	/** 相対角度を求める */
	static rel_deg(dx, dy) {
		return (Math.atan2(dy, dx) / Math.PI * 180 + 360) % 360;
	}

	/** -max~+maxの範囲でランダムな値を返却 */
	static getRandomInt(max) {
		//数値を決めるランダム
		let rand = Math.floor(Math.random() * Math.floor(max));

		//+か-を決めるランダム
		if (Math.random() < 0.5) {
			rand *= -1;
		}
		return rand;
	}

	/** ベクトル平均 */
	static avg_vec(dirs) {
		return Common.rel_deg(
			dirs.reduce((dx, dir) => dx + Math.cos(dir * Math.PI / 180), 0),
			dirs.reduce((dy, dir) => dy + Math.sin(dir * Math.PI / 180), 0));
	}

	/** 配列から特定のキーの配列を返す */
	static array_column(array, key) {
		return array.map(hash => hash[key]);
	}

	/** 配列から特定のキーの値を返す */
	static array_search(array, key, val) {
		return array.find(hash => hash[key] == val);
	}

	/** 小数点数値を指定桁数にする、四捨五入 */
	static round(msg, n) {
		return  Math.floor(msg * Math.pow(10,n)) / Math.pow(10, n);
	}
}
