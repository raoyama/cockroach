'use strict';

class Material {
    constructor(id, x, y, r, name) {
        this._id = id;
        this._x  = x;
        this._y  = y;
		this._direction(r);
		this._name = name;
		this._v  = 0.1;
    	this._view = new MaterialView(this);
    }

    run() {
		switch (World.mode) {
			case 1:
		        this.stopMove();
				break;
			default:
				this.randomMove();
		}
    }

	//止まれ
	stopMove() {
    }

	//ランダムに進む
    randomMove() {
        this._rotate(Common.getRandomInt(10));
		let col_deg = World.collision(this);
        if(col_deg != false) {
            //col_deg = (col_deg + 180) % 360; //入れると面白い
            this._direction((this._r + col_deg) / 2);
		}
		
    	this._move();
    }
	/** 現在の方向に向かって進む */
	_move() {
		this._x += Math.cos(this._r * Math.PI / 180) * this._v;
        this._y += Math.sin(this._r * Math.PI / 180) * this._v;
	}
	/** 
	 * 向きの直接設定
	 * 右を0度として0度~+359度の範囲に置換して設定
	 */
	_direction(r) {
		//マイナスの場合はプラスに変換
		if (r < 0) r = r % 360 + 360;
		this._r = r % 360;
	}
	/**
	 * 自身の向いている方向を基準とした向きの変更
	 * 正数:反時計回り
	 * 負数:時計回り
	 */
	_rotate(r) {
		this._direction(this._r + r);
	}
	
    get id() {return this._id;}
    get x() {return this._x;}
    get y() {return this._y;}
    get r() {return this._r;}
    get name() {return this._name;}
    get view() {return this._view;}
}
