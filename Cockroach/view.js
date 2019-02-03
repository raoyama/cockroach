/******************************************************************************
* ToDo
******************************************************************************/
/*
・点線で細かい線
・ズームをマウスカーソルの位置で
・logboxのテーブル化
*/
/******************************************************************************
* 定数・変数
******************************************************************************/
var rect_size = 1;		//サイズ

var c;
var wrap;
var ctx;

var pre_x = 0;				//move制御用前回の値
var pre_y = 0;

//相対座標上でのカメラ位置
g_camera_x = 0;
g_camera_y = 0;
//g_camera_z = 1;
g_camera_z = 0.05;

//相対座標の描画領域
var g_rel_top    = 0;	//相対座標での幅上限
var g_rel_right  = 0;	//相対座標での高さ上限
var g_rel_bottom = 0;	//相対座標での幅上限
var g_rel_left   = 0;	//相対座標での高さ上限

//スマホイベント制御用
var gesture_flg = false;
var drag_flg = 0;
var didFirstClick = 0;

/******************************************************************************
* 初期化
******************************************************************************/

function init() {

	c        = document.getElementById('canvas');
	wrap     = document.getElementById('wrap');
	c.height = wrap.offsetHeight;
	c.width  = wrap.offsetWidth;
	ctx      = c.getContext('2d');

	//PC マウス用
	c.onresize = resize;
	c.onmousewheel = mousewheel;
	c.onmousedown = mousedown;
	c.onmouseup = mouseup;
	c.onmousemove = move;

	//スマホ タッチ用
	c.ontouchstart = mousedown;
	c.ontouchmove = move;
	c.ontouchend = mouseup;

	//スマホ ピンチイン用
	c.ongesturechange = gesturechange;
	c.ongesturestart = gesturestart;
	c.ongestureend = gestureend;

	//ブラウザリサイズ対応
	window.addEventListener('resize', resize);

	init_data();

//	sizing();
//	draw_proc();
	window.requestAnimationFrame(mainloop);
}


/******************************************************************************
* 描画
******************************************************************************/

function draw_proc() {

	cal_area();
	ctx.clearRect(0, 0, c.width, c.height);

	//格子描画
	ctx.lineWidth = 1;
	ctx.strokeStyle = "rgba(150, 150, 150, 0.5)";

	 draw_line(0, g_rel_top, 0, g_rel_bottom);
	 draw_line(g_rel_left, 0, g_rel_right, 0);

/*
	//obj描画
	ctx.strokeStyle = "rgb(0, 0, 255)";
	ctx.lineWidth = 3;
	ctx.fillStyle = "rgba(100, 100, 255, 0.5)";			//塗りつぶしの色
	for (i = 0; i < nodes.length; i ++) {
		ctx.beginPath();
		pos = cal_pos(nodes[i][0], nodes[i][1]);
		ctx.fillRect(
			pos[0] - rect_size / 2 / g_camera_z,
			pos[1] - rect_size / 2 / g_camera_z,
			rect_size / g_camera_z,
			rect_size / g_camera_z);		//塗りつぶし
		ctx.strokeRect(
			pos[0] - rect_size / 2 / g_camera_z,
			pos[1] - rect_size / 2 / g_camera_z,
			rect_size / g_camera_z,
			rect_size / g_camera_z);	//枠線のみ

	}
*/

	ctx.strokeStyle = "rgb(0, 0, 255)";
	ctx.lineWidth = 3;
	ctx.fillStyle = "rgba(100, 100, 255, 0.5)";			//塗りつぶしの色

	for (i = 0; i < obj.length; i ++) {

		pos = cal_pos(obj[i].a, obj[i].b);
		ctx.translate( pos[0], pos[1] ) ;
		ctx.rotate( - obj[i].c * Math.PI / 180 );

		ctx.strokeStyle = "blue";
		ctx.fillRect(
			 - (rect_size * 2) / 2 / g_camera_z,
			 - rect_size / 2 / g_camera_z,
			(rect_size * 2) / g_camera_z,
			rect_size / g_camera_z
		);
		ctx.strokeRect(
			 - (rect_size * 2) / 2 / g_camera_z,
			 - rect_size / 2 / g_camera_z,
			(rect_size * 2) / g_camera_z,
			rect_size / g_camera_z
		);
		ctx.strokeRect(
			 (rect_size * 2) / 2 / g_camera_z,
			 - rect_size / 4 / g_camera_z,
			rect_size / 2 / g_camera_z,
			rect_size / 2 / g_camera_z
		);

		ctx.rotate(obj[i].c * Math.PI / 180);
		ctx.translate( - pos[0], - pos[1] ) ;
	}

	log("g_camera_x", g_camera_x);
	log("g_camera_y", g_camera_y);
	log("g_camera_z", g_camera_z);
	log("g_rel_bottom", g_rel_bottom);
	log("g_rel_top", g_rel_top);
	log("g_rel_left", g_rel_left);
	log("g_rel_right", g_rel_right);


}

function draw_line(x1, y1, x2, y2) {
	ctx.beginPath();
	sp = cal_pos(x1, y1);
	ep = cal_pos(x2, y2);

	ctx.moveTo(sp[0], sp[1]);
	ctx.lineTo(ep[0], ep[1]);
	ctx.stroke();
}

function cal_pos(pos_x, pos_y) {

	//カメラのX,Y方向補正
	pos_x -= g_camera_x;
	pos_y -= g_camera_y;

	//カメラのZ方向補正
	pos_x /= g_camera_z;
	pos_y /= g_camera_z;

	//画面座標用にY軸反転
	pos_y *= -1;

	//画面中心に移動
	pos_x += c.width / 2;
	pos_y += c.height / 2;

	return [pos_x, pos_y];
}

/******************************************************************************
* イベント関数
******************************************************************************/

//相対座標領域計算
function cal_area() {
	g_rel_left   = - c.width / 2 * g_camera_z + g_camera_x;
	g_rel_right  = c.width / 2 * g_camera_z + g_camera_x;
	g_rel_top    = c.height / 2 * g_camera_z + g_camera_y;
	g_rel_bottom = - c.height / 2 * g_camera_z + g_camera_y;
}

function sizing() {
	c.height = wrap.offsetHeight;
	c.width = wrap.offsetWidth;

	draw_proc();
}

function resize() {
	(!window.requestAnimationFrame) ? setTimeout(sizing, 300): window.requestAnimationFrame(sizing);
}

function mousewheel(ev) {
	if(ev.wheelDelta > 0) {
		g_camera_z *= 0.9;
	} else {
		g_camera_z *= 1.1;
	}

	draw_proc();
}


function mousedown(ev) {
	if(gesture_flg == true) return;
    drag_flg = 1;

	//スマホ対応
	if(ev.targetTouches != undefined) {
		ev.preventDefault();	//ブラウザ標準動作を抑止する。
		var ev = ev.targetTouches[0];

		if(didFirstClick == 0) {
			didFirstClick = 1;
			didFirstClick = setTimeout( function() {
				didFirstClick = 0 ;
			}, 300 ) ;

		} else {
			didFirstClick = 0 ;
		}

	}

	pre_x = ev.clientX;
	pre_y = ev.clientY;
	draw_proc();
}

function mouseup(ev) {
	if(gesture_flg == true) return;

	drag_flg = 0;
	draw_proc();
}

function move(ev) {
	if (drag_flg == 0) return;
	if(gesture_flg == true) return;

	//スマホ対応
	if(ev.targetTouches != undefined) {
		ev.preventDefault();	//ブラウザ標準動作を抑止する。
		var ev = ev.targetTouches[0];
	}

	 //画面移動量
	var dx = ev.clientX - pre_x;
	var dy = ev.clientY - pre_y;
	pre_x = ev.clientX;
    pre_y = ev.clientY;

	//カメラの相対移動量
	g_camera_x -= dx * g_camera_z;
	g_camera_y += dy * g_camera_z;

	draw_proc();
}

//マルチタッチ対応
function gesturechange(ev) {
	var ds = 1 + ((ev.scale - 1) * 0.05);
	g_camera_z = g_camera_z / ds;
	draw_proc();
}

function gesturestart(ev) {
	ev.preventDefault();
	gesture_flg = true;
}
function gestureend(ev) {
	ev.preventDefault();
	gesture_flg = false;
}

/******************************************************************************
* データ初期化
******************************************************************************/
//データから各種初期値計算
function init_data() {

}

/******************************************************************************
* 共通関数
******************************************************************************/

//log関数
function log(target, msg) {
	var elem = document.getElementById(target);
	if (elem == null) {
		elem = document.createElement("div");
		elem.id = target;
		root_elem = document.getElementById('log');
		root_elem.appendChild(elem);
	}

	n = 3;
	msg = Math.floor(msg * Math.pow(10,n)) / Math.pow(10, n);
	elem.innerText = target + ":" + msg;
}
/*
	log("g_camera_x", g_camera_x);
	log("g_camera_y", g_camera_y);
	log("g_camera_z", g_camera_z);
	log("g_rel_bottom", g_rel_bottom);
	log("g_rel_top", g_rel_top);
	log("g_rel_left", g_rel_left);
	log("g_rel_right", g_rel_right);
*/
/*
	log("abs_start_x", sp[0]);
	log("abs_start_y", sp[1]);
	log("abs_end_x", ep[0]);
	log("abs_end_y", ep[1]);
*/
	