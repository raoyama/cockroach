'use strict';

class Cockroach {
    constructor(id, x, y, r, name) {
        this._id = id;
        this._x  = x;
        this._y  = y;
		this._r  = r;
		this._name = name;
    	this._v  = 0.1;
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
			case 3:
		        this.lineupMove();
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
        } //else {
			//ぶつからなければ集まれ動作
			this.measure();
			let dirs = Common.array_column(this._rel_coods, 'rel_cood');
			this._r += Common.avg_vec(dirs);
//        }
		
		this.move();
	}

	//直線にならう
	lineupMove() {

    	if(this._id == 1) {
			this._v = 0.1;
    	}
		else {
			let col_deg = World.collision(this);

			if(col_deg != false) {
				//ぶつかったら衝突動作
				this.rebound(col_deg);
	        }

			//ぶつからなければ1列動作
			this.measure();
        	let tmp = Common.array_search(this._rel_coods, 'id', this._id - 1);
			this._r += tmp['rel_cood'];
		}

		this.move();
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
		this._x += Math.cos(this._r * Math.PI / 180) * this._v;
        this._y += Math.sin(this._r * Math.PI / 180) * this._v;
    }
	rebound(col_deg) {
		this._x += Math.cos(col_deg * Math.PI / 180) * 3.5;
        this._y += Math.sin(col_deg * Math.PI / 180) * 3.5;
    }
	
    get id() {return this._id;}
    get x() {return this._x;}
    get y() {return this._y;}
    get r() {return this._r;}
    get name() {return this._name;}

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
        	let tmp = [];
        	tmp['id']       = cockroaches[i].id;
        	tmp['rel_cood'] = rel_cood;
        	this._rel_coods.push(tmp);
        }
    	//console.log(this._rel_coods);
    }
}
