// setup gameboard
	//difine proportions of gameboard
	//setup count variable

//draw enemies
  //data set of random starting positions
  //map data set to div
  var randomCordinates = function(max){
    return Math.random() * max ;
  };
  var enemyGenerator = function(xMax,yMax){
    var result = [];
    for(var i =0; i<gameOptions.nEmemies;i++){
      result.push([randomCordinates(xMax),randomCordinates(yMax)]);
    }
    return result;
  };
  var gameOptions = {
    height: 400, //Y
    width: 600, //X
    nEmemies: 20
  };

  var enemyArray = enemyGenerator(gameOptions.width - 20,gameOptions.height - 10);
  var gameBoard = d3.select('.container').append('svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);

  var enemies = gameBoard.selectAll('circle')
                .data(enemyArray)
                .enter()
                .append('circle');
  var enemyAttributes = enemies
                        .attr('class','enemy')
                        .attr('cx', function(d){return d[0];})
                        .attr('cy', function(d){return d[1];})
                        .attr('r', 10)
                        .style('fill','grey')
                        .transition().each('end', function(){
                        	moveEnemies(); //Figure out each / end
                        });
//make the enemies move randomly every second
	//setTimeout every second - run a move function
	var moveEnemies = function(){
		d3.selectAll('.enemy').data(enemyGenerator(580, 390))
		.transition().duration(1000)
			.attr('cx', function(d){return d[0];})
      .attr('cy', function(d){return d[1];})
			.each('end', function(){
				moveEnemies();
			});
	};
	//change the cx & cy values to new random values


//make a player that is draggable
var drag = d3.behavior.drag()
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); });
var player = gameBoard.selectAll('circle.player')
              .data([{ x: (gameOptions.width / 2), y: (gameOptions.height / 2)}])
              .enter()
              .append('svg:circle');

var playerAttributes = player
                      .attr('class','player')
                      .attr('cx', function(d) { return d.x; })
                      .attr('cy', function(d) { return d.y; })
                      .attr('r', 10)
                      .style('fill','red')
                      .call(drag);


//detect collisions

//keep track of score
