"use strict";

class Cockroach {
    constructor(x, y, r) {
        this._x = x;
        this._y = y;
        this._r = r;
    }

    run() {
        if (World.mode == 1) {
            this.lineupMove();
        } else {
            this.randomMove();
        }
    }

    lineupMove() {
    }

    randomMove() {
        let dir = Common.getRandomInt(10);
        
        this._r += dir;
        this._x += Math.cos(this._r * Math.PI / 180) * 0.1;
        this._y += Math.sin(this._r * Math.PI / 180) * 0.1;
        let col_deg = World.colision(this);
        if(col_deg != false) {
            //col_deg = (col_deg + 180) % 360; //入れると面白い
            this._r = (this._r + col_deg) / 2;
        }
    	this.measure();
    }

    get x() {return this._x;}
    get y() {return this._y;}
    get r() {return this._r;}

	/** 
	 * ゴキブリ場所の測定
	 * 自身の進行方向を0°、時計回りに0°～360°角度が増える
	 * 全ゴキブリ分のデータ保持
	 */
    measure() {
    	this._rel_coods = [];
        for (let i in cockroaches) {
        	if (this == cockroaches[i]) {
        		continue;
        	}
            let dx = this._x - cockroaches[i].x;
            let dy = this._y - cockroaches[i].y;
        	let rel_cood = (Common.rel_deg(dx, dy) + this._r + 180 ) % 360;
        	this._rel_coods.push(rel_cood);
        }
    	//console.log(this._rel_coods);
    }
}
