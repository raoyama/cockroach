'use strict';

class Cockroach extends Material{
    constructor(id, x, y, r, name) {
		super(id, x, y, r, name);
    	this._view = new CockroachView(this);
    }

}
