'use strict';

class Material {
    constructor(id, x, y, r, name) {
        this._id = id;
        this._x  = x;
        this._y  = y;
		this._direction(r);
		this._name = name;
		this._v  = 0.1;
		this._notFoundCnt = 0;
		this._collistionTime = 0;
    	this._view = new MaterialView(this);
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
			this._direction((this._r + col_deg) / 2);
			this._collistionTime = 10
        } else if (this._collistionTime > 0) {
			//ぶつかった後一定時間方向転換禁止
			this._collistionTime--;
		} else {
			//ぶつからなければ集まれ動作
			let cDegs = World.search(this);
			if (cDegs.length == 0 && this._notFoundCnt > 100) {
				//いつまでも他のゴキが見つからない場合は強制反転
				this._rotate(180);
				this._notFoundCnt = 0;
			} else if (cDegs.length == 0) {
				//見える範囲に他のゴキがいない場合はランダム移動
				this._rotate(Common.getRandomInt(10));
				this._notFoundCnt++;
			} else {
				//平均を算出してみんながたくさんいそうな方向へ進む
				let degs = Common.array_column(cDegs, 'rel_cood');
				let ave = degs.reduce((total, deg) => total + deg, 0) / degs.length;
				this._rotate(ave);
				this._notFoundCnt = 0;
			}
        }
		
		this._move();
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
				this._rebound(col_deg);
	        }

			//ぶつからなければ1列動作
			this._measure();
        	let tmp = Common.array_search(this._rel_coods, 'id', this._id - 1);
			this._rotate(tmp['rel_cood']);
		}

		this._move();
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
	_rebound(col_deg) {
		this._x += Math.cos(col_deg * Math.PI / 180) * 3.5;
        this._y += Math.sin(col_deg * Math.PI / 180) * 3.5;
    }
	
    get id() {return this._id;}
    get x() {return this._x;}
    get y() {return this._y;}
    get r() {return this._r;}
    get name() {return this._name;}
    get view() {return this._view;}

	/** 
	 * ゴキブリ場所の測定
	 * 自身の進行方向を0°、反時計回りに0°～360°角度が増える
	 * 全ゴキブリ分のデータ保持
	 */
    _measure() {
    	this._rel_coods = [];
        for (let i in world.materials) {
        	if (this == world.materials[i]) {
        		continue;
        	}
        	let dx = world.materials[i].x - this._x;
        	let dy = world.materials[i].y - this._y;
        	let rel_cood = (Common.rel_deg(dx, dy) - this._r + 360) % 360;
        	let tmp = [];
        	tmp['id']       = world.materials[i].id;
        	tmp['rel_cood'] = rel_cood;
        	this._rel_coods.push(tmp);
        }
    }
}
