'use strict';

class Cockroach extends Material {
    constructor(id, x, y, r, name) {
		super(id, x, y, r, name);
    	this._view = new CockroachView(this);
		this._notFoundCnt = 0;
		this._collistionTime = 0;
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
				this._rotate(Common.avg_vec(Common.array_column(cDegs, 'rel_cood')));
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
	
	_rebound(col_deg) {
		this._x += Math.cos(col_deg * Math.PI / 180) * 3.5;
        this._y += Math.sin(col_deg * Math.PI / 180) * 3.5;
    }
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
