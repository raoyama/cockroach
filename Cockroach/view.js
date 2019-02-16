'use strict';

/******************************************************************************
* 定数・変数
******************************************************************************/
const rect_size = 1; //ゴキブリのサイズ
    //document格納用
var c,
	wrap,
	cockroach_select,
	ctx,
	//move制御用前回の値
    pre_x = 0,				
    pre_y = 0,
    //相対座標上でのカメラ位置
    g_camera_x = 0,
    g_camera_y = 0,
    g_camera_z = 0.05,
    //相対座標の描画領域
    g_rel_top    = 0,	//相対座標での幅上限
    g_rel_right  = 0,	//相対座標での高さ上限
    g_rel_bottom = 0,	//相対座標での幅上限
    g_rel_left   = 0,	//相対座標での高さ上限
    //スマホイベント制御用
    gesture_flg = false,
    drag_flg = 0,
    didFirstClick = 0;

/******************************************************************************
* 初期化
******************************************************************************/

function init() {
	c        = document.getElementById('canvas');
	wrap     = document.getElementById('wrap');
	cockroach_select = document.getElementById('cockroach_select');
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
	
	World.mode = 1;
	
	init_data();

	//ゴキブリセレクトボックスの作成
	cockroaches.forEach(function(cockroach){
		let op = document.createElement('option');
		op.value = cockroach.name;
		op.text = cockroach.name;
		cockroach_select.appendChild(op);
	});

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
	ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';

	draw_line(0, g_rel_top, 0, g_rel_bottom);
	draw_line(g_rel_left, 0, g_rel_right, 0);

	//画面ログ出力
	log('g_camera_x', g_camera_x);
	log('g_camera_y', g_camera_y);
	log('g_camera_z', g_camera_z);
	log('g_rel_bottom', g_rel_bottom);
	log('g_rel_top', g_rel_top);
	log('g_rel_left', g_rel_left);
	log('g_rel_right', g_rel_right);
	log('mode', World.mode);

	//ゴキブリの描画
	ctx.lineWidth = 3;
	cockroaches.forEach(function(cockroach) {
		let pos = cal_pos(cockroach.x, cockroach.y);
		ctx.translate( pos[0], pos[1] ) ;
		ctx.rotate( - cockroach.r * Math.PI / 180 );
		
		if (cockroach_select.options[cockroach_select.selectedIndex].value == cockroach.name){
			//選択されたゴキブリのログ出力
			ctx.strokeStyle = 'red';
			ctx.fillStyle = 'rgba(255, 100, 100, 0.5)';
			cocklog( 'x', cockroach.x);
			cocklog( 'y', cockroach.y);
			cocklog( 'r', cockroach.r);
		}
		else {
			//選択されていないゴキブリのログ削除
			ctx.strokeStyle = 'blue';
			ctx.fillStyle = 'rgba(100, 100, 255, 0.5)';
		}
		
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

		ctx.rotate(cockroach.r * Math.PI / 180);
		ctx.translate( - pos[0], - pos[1] ) ;

		//検知範囲描画
		draw_dottedLineCircle(pos[0], pos[1], World.detectionRange / g_camera_z);

		pos = cal_pos(cockroach.x - 1, cockroach.y + 1.5);
		ctx.lineWidth = 2;
		ctx.font = "15px 'Arial'";
		ctx.strokeText(cockroach.name, pos[0], pos[1]);
	});
}

function draw_line(x1, y1, x2, y2) {
	ctx.beginPath();
	let sp = cal_pos(x1, y1),
	    ep = cal_pos(x2, y2);

	ctx.moveTo(sp[0], sp[1]);
	ctx.lineTo(ep[0], ep[1]);
	ctx.stroke();
}

function draw_dottedLineCircle(x, y, r) {
	//分割数
	let splitNum = 72;
	for (let i = 0; i < splitNum * 2; i++) {
		if (i % 2 == 0)continue;
		ctx.beginPath();
		//ラジアン角で算出
		ctx.arc(x, y, r, i / splitNum * Math.PI, (i + 1) / splitNum * Math.PI, false);
		ctx.stroke();
	}
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
	let evt = ev;
	//スマホ対応
	if(ev.targetTouches != undefined) {
		ev.preventDefault();	//ブラウザ標準動作を抑止する。
		evt = ev.targetTouches[0];

		if(didFirstClick == 0) {
			didFirstClick = 1;
			didFirstClick = setTimeout( function() {
				didFirstClick = 0 ;
			}, 300 ) ;

		} else {
			didFirstClick = 0 ;
		}

	}

	pre_x = evt.clientX;
	pre_y = evt.clientY;
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

	let evt = ev;
	//スマホ対応
	if(ev.targetTouches != undefined) {
		ev.preventDefault();	//ブラウザ標準動作を抑止する。
		evt = ev.targetTouches[0];
	}

	 //画面移動量
	let dx = evt.clientX - pre_x;
	let dy = evt.clientY - pre_y;
	pre_x = evt.clientX;
    pre_y = evt.clientY;

	//カメラの相対移動量
	g_camera_x -= dx * g_camera_z;
	g_camera_y += dy * g_camera_z;

	draw_proc();
}

//マルチタッチ対応
function gesturechange(ev) {
	let ds = 1 + ((ev.scale - 1) * 0.05);
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

//log共通関数
function comlog(table_id, target, msg) {

	let log_table_elem = document.getElementById(table_id);

	let elem = document.getElementById(target);
	if (elem == null) {
		let td_key = document.createElement('td');
		td_key.align = 'left';
		td_key.textContent = target;

		let td_val = document.createElement('td');
		td_val.align = 'right';
		td_val.id  = target;
		elem = td_val;

		let tr = document.createElement('tr');
		tr.appendChild(td_key);
		tr.appendChild(td_val);
		log_table_elem.appendChild(tr);
	}
	elem.innerText = Common.round(msg, 2);
}

//全体log
function log(target, msg) {
	comlog('log_table', target, msg);
}

//obj毎log
function cocklog(target, msg) {
	comlog('cocklog_table', target, msg);
}
