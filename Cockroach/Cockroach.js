"use strict";

class Cockroach {
    constructor(x, y, r) {
        this._x = x;
        this._y = y;
        this._r = r;
    }

    run() {
		switch (World.mode) {
			case 0:
		        this.randomMove();
				break;
			case 1:
		        this.stopMove();
				break;
			case 2:
		        this.gatherMove();
				break;
			default:
		}
    }

	//止まれ
	stopMove() {
    }

	//みんなの方に進む
	gatherMove() {
		let col_deg = World.collision(this);

        if(col_deg != false) {
			//ぶつかったら衝突動作
            this._r = (this._r + col_deg) / 2;
        } else {
			//ぶつからなければ集まれ動作
			this.measure();
			this._r += Common.avg_vec(this._rel_coods);
        }
		
		this.move();
	}

	//直線にならう
	lineupMove() {
    }

	//ランダムに進む
    randomMove() {
        this._r += Common.getRandomInt(10);
		let col_deg = World.collision(this);
        if(col_deg != false) {
            //col_deg = (col_deg + 180) % 360; //入れると面白い
            this._r = (this._r + col_deg) / 2;
		}
		
    	this.move();
    }

	//現在の方向に向かって進む
	move() {
		this._x += Math.cos(this._r * Math.PI / 180) * 0.1;
        this._y += Math.sin(this._r * Math.PI / 180) * 0.1;
    }

    get x() {return this._x;}
    get y() {return this._y;}
    get r() {return this._r;}

	/** 
	 * ゴキブリ場所の測定
	 * 自身の進行方向を0°、反時計回りに0°～360°角度が増える
	 * 全ゴキブリ分のデータ保持
	 */
    measure() {
    	this._rel_coods = [];
        for (let i in cockroaches) {
        	if (this == cockroaches[i]) {
        		continue;
        	}
        	let dx = cockroaches[i].x - this._x;
        	let dy = cockroaches[i].y - this._y;
        	let rel_cood = (Common.rel_deg(dx, dy) - this._r + 360) % 360;
        	this._rel_coods.push(rel_cood);
        }
    	//console.log(this._rel_coods);
    }
}
