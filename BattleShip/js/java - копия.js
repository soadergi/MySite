//window.onload = view.init;

var view = {
	displayRepeat: function(){
		alert("You have already shot hire");
	},
	displayHit: function(){
		alert("HIT!");
	},
	displayMiss: function(){
		alert("MISS!");
	},
	init: function(){
		model.generateShipLocation();
		document.getElementById("button").addEventListener("click", controller.getUserInput);
	},
	handleFire: function(input, e){
		console.log("handleFire"+input+ e);
		switch(e){
			case 0: this.displayRepeat();
			break;
			case -1: this.displayMiss();
			break;
			case 1: this.displayHit();
			break;
			default: alert("ERROR. STAY DOWN");
		}
	},
}

var controller = {
	//input: 0,
	getUserInput: function(){
		var user_input = document.getElementById("sector_input").value;
		console.log(user_input);
		var ABCDEFG = ["A","B","C","D","E","F","G"];
		var _0123456 = ["0","1","2","3","4","5","6"];
		var input0 = ABCDEFG.indexOf(user_input[0]);
		var input1 = _0123456.indexOf(user_input[1]);
		//console.log(input0);
		//console.log(input1);
		if(input0 == -1 || input1 == -1){
			alert('Введите корректное значение!');
		} else{
			var input = String(input0) + String(input1);
			console.log("Input" + input);
			//controller.input = input;
			model.checkShot(input);
		};
	}
}

var model = {
	result: -1,
	hits: 0,
	shots: 0,
	ship: {
		location: [],
	},
	shipLocation: {
		ship1: {
			location: [10,11,12],
			alive: [1,1,1]
		},
		ship2: {
			location: [30,31,32],
			alive: [1,1,1]
		},
		ship3: {
			location: [50,51,52],
			alive: [1,1,1]
		}
	},
	generateShipLocation: function(){
		var firstPos = Math.round(Math.random()*6);
		var secondPos = Math.round(Math.random()*6);
		var Pos = String(firstPos) + String(secondPos);
		var x = ['','',''];
		switch(Pos){
			case '00':
			if (Math.round(Math.random()) == 0){
				x = ['00','01','02'];
			} else {
				x = ['00','10','20'];
			};
			break;
			case '06':
			if (Math.round(Math.random()) == 0){
				x = ['04','05','06'];
			} else {
				x = ['06','16','26'];
			};
			break;
			case '66':
			if (Math.round(Math.random()) == 0){
				x = ['46','56','66'];
			} else {
				x = ['64','65','66'];
			};
			break;
			case '60':
			if (Math.round(Math.random()) == 0){
				x = ['40','50','60'];
			} else {
				x = ['60','61','62'];
			};
			break;
			case '10': case '20': case '30': case '40': case '50':
			if(Math.round(Math.random()) == 0){
				x[0] = +Pos;
				x[1] = +Pos + 1;
				x[2] = +Pos + 2;
			} else {
				x[0] = +Pos - 10;
				x[1] = +Pos;
				x[2] = +Pos + 10;
			};
			break;
			case '01': case '02': case '03': case '04': case '05':
			if(Math.round(Math.random()) == 0){
				x[0] = +Pos - 1;
				x[1] = +Pos;
				x[2] = +Pos + 1;
			} else {
				x[0] = +Pos;
				x[1] = +Pos + 10;
				x[2] = +Pos + 20;
			};
			break;
			case '16': case '26': case '36': case '46': case '56':
			if(Math.round(Math.random()) == 0){
				x[0] = +Pos - 2;
				x[1] = +Pos - 1;
				x[2] = +Pos;
			} else {
				x[0] = +Pos - 10;
				x[1] = +Pos;
				x[2] = +Pos + 10;
			};
			break;
			case '61': case '62': case '63': case '64': case '65':
			if(Math.round(Math.random()) == 0){
				x[0] = +Pos - 1;
				x[1] = +Pos;
				x[2] = +Pos + 1;
			} else {
				x[0] = +Pos - 20;
				x[1] = +Pos - 10;
				x[2] = +Pos;
			};
			break;
			default:
			if(Math.round(Math.random()) == 0){
				x[0] = +Pos - 1;
				x[1] = +Pos;
				x[2] = +Pos + 1;
			} else {
				x[0] = +Pos - 10;
				x[1] = +Pos;
				x[2] = +Pos + 10;
			};
			break;
		};
		for (var i in x){
			x[i] = x[i].toString();
			if(x[i].length == 1){
				x[i] = String(0) + x[i];
			};
		};
		return generategLocation = x;
	},
	checkShot: function(input){
		console.log("checkShot" + input);
		this.result = -1;
		this.shots++;
		for (var x in this.shipLocation.ship1.location){
			if (this.shipLocation.ship1.location[x] == input){
				if(this.shipLocation.ship1.alive[x] == 0){
					this.result = 0;
					this.shots--;
				} else {
					alert("HIT"+x);
					this.shipLocation.ship1.alive[x] = 0;
					this.result = 1;
					this.hits++;
				}
			}
		};
		view.handleFire(input, this.result);
	}
}



window.onload = view.init;
