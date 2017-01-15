

var view = {
	displayRepeat: function(){
		alert("You have already shot hire");
	},
	displayHit: function(input, e){
		var hitInput = String(input);
		var hit = document.getElementById(hitInput);
		hit.className += ' hit';
		var div = document.getElementById('output');
		div.innerHTML = 'HIT!';
		if(e == 2){
			div.innerHTML = 'HIT! You sank the ship!';
		};
		if(model.hits == 9){
			div.innerHTML = 'HIT! You sank the ship!<br/>VICTORY! You did '+model.shots+' shots!';
		};
	},
	displayMiss: function(input){
		var hitInput = String(input);
		var hit = document.getElementById(hitInput);
		hit.className += ' miss';
		var div = document.getElementById('output');
		div.innerHTML = 'MISS!';
	},
	init: function(){
		var td = $("td");
		td.click(function(){
			model.checkShot($(this).attr('id'));
		})
		model.generateShipPosition();
		document.getElementById("button").addEventListener("click", controller.getUserInput);
	},
	handleFire: function(input, e){
		switch(e){
			case 0: this.displayRepeat();
			break;
			case -1: this.displayMiss(input);
			break;
			case 1: this.displayHit(input);
			break;
			case 2: this.displayHit(input, e);
			break;
			default: alert("ERROR. STAY DOWN");
		}
	},
}

var controller = {
	getUserInput: function(){
		var user_input = document.getElementById("sector_input").value;
		var ABCDEFG = ["A","B","C","D","E","F","G"];
		var _0123456 = ["0","1","2","3","4","5","6"];
		var input0 = ABCDEFG.indexOf(user_input[0]);
		var input1 = _0123456.indexOf(user_input[1]);
		if(input0 == -1 || input1 == -1){
			alert('Введите корректное значение!');
		} else{
			var input = String(input0) + String(input1);
			model.checkShot(input);
		};
	}
}

var model = {
	result: -1,
	hits: 0,
	shots: 0,
	shipLocation: {
		ship1: {
			location: [],
			alive: [1,1,1]
		},
		ship2: {
			location: [],
			alive: [1,1,1]
		},
		ship3: {
			location: [],
			alive: [1,1,1]
		}
	},
	generateShipPosition(){
		this.shipLocation.ship1.location = this.generateShipLocation();
		this.shipLocation.ship2.location = this.generateShipLocation();
		for(var i in this.shipLocation.ship1.location){
			for(var y in this.shipLocation.ship2.location){
				if(this.shipLocation.ship1.location[i] == this.shipLocation.ship2.location[y]){
					this.generateShipPosition();
				}
			};
		};
		this.shipLocation.ship3.location = this.generateShipLocation();
		for(var i in this.shipLocation.ship1.location){
			for(var y in this.shipLocation.ship3.location){
				if(this.shipLocation.ship1.location[i] == this.shipLocation.ship3.location[y]){
					this.generateShipPosition();
				}
			};
		};
		for(var i in this.shipLocation.ship2.location){
			for(var y in this.shipLocation.ship3.location){
				if(this.shipLocation.ship2.location[i] == this.shipLocation.ship3.location[y]){
					this.generateShipPosition();
				}
			};
		};
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
		this.result = -1;
		this.shots++;
		for (var x in this.shipLocation.ship1.location){
			if (this.shipLocation.ship1.location[x] == input){
				if(this.shipLocation.ship1.alive[x] == 0){
					this.result = 0;
					this.shots--;
				} else {
					this.shipLocation.ship1.alive[x] = 0;
					this.result = 1;
					this.hits++;
					if(this.shipLocation.ship1.alive[0] == 0 && this.shipLocation.ship1.alive[1] == 0 && this.shipLocation.ship1.alive[2] == 0){
						this.result = 2;
					}
				}
			}
		};
		for (var x in this.shipLocation.ship2.location){
			if (this.shipLocation.ship2.location[x] == input){
				if(this.shipLocation.ship2.alive[x] == 0){
					this.result = 0;
					this.shots--;
				} else {
					this.shipLocation.ship2.alive[x] = 0;
					this.result = 1;
					this.hits++;
					if(this.shipLocation.ship2.alive[0] == 0 && this.shipLocation.ship2.alive[1] == 0 && this.shipLocation.ship2.alive[2] == 0){
						this.result = 2;
					}
				}
			}
		};
		for (var x in this.shipLocation.ship3.location){
			if (this.shipLocation.ship3.location[x] == input){
				if(this.shipLocation.ship3.alive[x] == 0){
					this.result = 0;
					this.shots--;
				} else {
					this.shipLocation.ship3.alive[x] = 0;
					this.result = 1;
					this.hits++;
					if(this.shipLocation.ship3.alive[0] == 0 && this.shipLocation.ship3.alive[1] == 0 && this.shipLocation.ship3.alive[2] == 0){
						this.result = 2;
					}
				}
			}
		};
		var hitPosition = document.getElementById(input);
		if (hitPosition.classList.contains("miss")){
			this.result = 0;
			this.shots--;
		}
		view.handleFire(input, this.result);
	}
}



window.onload = view.init;
