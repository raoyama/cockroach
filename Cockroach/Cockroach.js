"use strict";

class Cockroach {
	constructor(x, y, r) {
		this._x = x;
		this._y = y;
		this._r = r;
    }

	run() {
        if (this._mode == 1) {
            this.lineupMove();
        } else {
            this.randomMove();
        }
    }

    lineupMove() {
    }

    randomMove() {
        let dir = getRandomInt(10);
        
        this._r += dir;
        this._x += Math.cos(this._r * Math.PI / 180) * 0.1;
        this._y += Math.sin(this._r * Math.PI / 180) * 0.1;
        
        colision(this)
    }

    get x() {return this._x;}
    get y() {return this._y;}
    get r() {return this._r;}
    set x(x) {this._x = x;}
    set y(y) {this._y = y;}
    set r(r) {this._r = r;}
    /** 1:集まれモード else:散れモード */
    get mode() {return this._mode;}
    set mode(mode) {this._mode = mode;}
}

function getRandomInt(max) {
    let rand = Math.floor(Math.random() * Math.floor(max));

    if(Math.random() < 0.5) {
        rand *= -1;
    }
    
    return rand;
}
