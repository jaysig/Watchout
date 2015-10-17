// setup gameboard
	//difine proportions of gameboard
	//setup count variable

	var gameOptions = {
		height: 450,
		width: 700,
		nEnemies: 30,
		padding: 20
	};

	var gameStats = {
		score: 0,
		bestScore: 0
	};

	var axes = {
		x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
		y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
	};
//create data elements
var gameBoard = d3.select('.gameArea').append('svg:svg')
	.attr('width', gameOptions.width)
	.attr('height', gameOptions.height);

var updateScore = function(){
	return d3.select('#current-score')
			.text(gameStats.score.toString())
}

var updateBestScore = function() {
	gameStats.bestScore = Math.max([gameStats.bestScore, gameStats.score])
	return d3.select('#best-score').text(gameStats.bestScore.toString());
}

var Player = function(){
	this.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';
	this.fill = '#ff6600';
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	this.r = 5;
	// temporary fix for importing game options, dragging
	//this.gameOptions = gameOptions;
	//this.setupDragging = setupDragging;
}

//look back at constructor inside demo
// @ = this (coffescript)
Player.prototype.constructor = function(gameOptions) {
	return this.gameOptions = gameOptions;
};

// => is for functions bound the current value of this
// need bounded function that takes in game
Player.prototype.render = ( function(_this) {
    return function(to) {
      _this.el = to.append('svg:path')
      	.attr('d', _this.path)
      	.attr('fill', _this.fill);
      	console.log(_this);
      _this.transform({
        x: _this.gameOptions.width * 0.5,
        y: _this.gameOptions.height * 0.5
      });
      _this.setupDragging();
      return _this;
    };
  })(this);
/*
Player.prototype.render = function(gameboard){
	//check string status of svg path
	var player = this;
	this.el = gameBoard.append( 'svg:path' )
		.attr('d', this.path)
		.attr('fill', this.fill);

	this.transform = {
		x: this.gameOptions.width * 0.5,
		y: this.gameOptions.height * 0.5
	}

	this.setupDragging()
}
*/



//for the following for functions check how to bind this
Player.prototype.getX = (function(_this){
	return function(){
		return _this.x
		}
	})(this);


Player.prototype.setX = (function(_this) {
	return function(x){
				var minX = _this.gameOptions.padding;
				var maxX = _this.gameOptions.width - _this.gameOptions.padding;

				if (x <= minX){
					x = minX;
				} else if (x >= maxX){
					x = maxX;
				}

				return _this.x = x;
		}
})(this);


Player.prototype.getY = (function(_this){
	return function(){
		return _this.y
		}
	})(this);


Player.prototype.setY = (function(_this) {
	return function(y){
				var minY = _this.gameOptions.padding;
				var maxY = _this.gameOptions.width - _this.gameOptions.padding;

				if (y <= minY){
					y = minY;
				} else if (y >= maxY){
					y = maxY;
				}

				return _this.y = y;
		}
})(this);

Player.prototype.transform = (function( _this) {
	return function(opts) {
		console.log(_this);
		_this.angle = opts.angle || _this.angle;
		_this.setX = opts.x || _this.x;
		_this.setY = opts.y || _this.y;

		_this.el.attr('transform', "rotate(#{_this.angle},#{_this.getX()},#{_this.getY()}) "+
	      "translate(#{_this.getX()},#{_this.getY()})");
	};
})(this);


Player.prototype.moveAbsolute = ( function(_this) {
	return function(x, y){
			_this.transform = {
				x: x,
				y: y
			}
		}
	})(this);

Player.prototype.moveRelative = (function(_this){
	return function(dx, dy) {
		_this.transform = {
			x: _this.getX() + dx,
			y: _this.getY() + dy,
			angle: 360 * (Math.atan2(dy, dx)/(Math.PI * 2))
		}
	}
})(this);

Player.prototype.setupDragging = (function(_this) {
	return function(){
		var dragMove = function(){ return _this.moveRelative(d3.event.dx, d3.event.dy) }
		var drag = d3.behavior.drag()
			.on('drag', dragMove);
		_this.el.call(drag);
	}
})(this);

players = [];
players.push( new Player(gameOptions).render(gameBoard) );

var createEnemies = function(){
	_.range(0, gameOptions.nEnemies).map( function(i){
		return {
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100
		}
	});
}

var render = function(enemy_data){
	var enemies = gameBoard.selectAll('circle.enemy')
		.data(enemy_data, function(d) { return d.id });

	enemies.enter()
	.append('svg:circle')
		.attr('class', 'enemy')
		.attr('cx', function(enemy){ return axes.x(enemy.x) } )
		.attr('cy', function(enemy){ return axes.y(enemy.y) } )
		.attr('r', 0)

enemies.exit()
	.remove();
}



//collisions


var play = function( ){
	var gameTurn = function(){
		var newEnemyPositions = createEnemies();
		return render(newEnemyPositions);
	}

	var increaseScore = function(){
		gameStats.score += 1;
		updateScore();
	}
	gameTurn()
//setInterval(function(){ alert("Hello"); }, 3000);
	setInterval( function(){ return gameTurn() }, 2000);
	setInterval( function(){ return increaseScore()}, 50);

 }

 play();
