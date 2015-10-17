// setup gameboard
	//difine proportions of gameboard
	//setup count variable

//draw enemies
  //data set of random starting positions
  //map data set to div
  var enemyCount = 10;
  var randomCordinates = function(max){
    return Math.random() * max ;
  };
  var enemyGenerator = function(xMax,yMax){
    var result = [];
    for(var i =0; i<enemyCount;i++){
      result.push([randomCordinates(xMax),randomCordinates(yMax)]);
    }
    return result;
  };
  var enemyArray = enemyGenerator(100,100);
  var gameBoard = d3.select('.container').append('svg')
                  .attr('width', 600)
                  .attr('height', 400);

  var enemies = gameBoard.selectAll('circle')
                .data(enemyArray)
                .enter()
                .append('circle');
  console.log(enemyArray);
  var enemyAttributes = enemies
                        .attr('cx', function(d){return d[0];})
                        .attr('cy', function(d){return d[1];})
                        .attr('r', 10)
                        .style('fill','grey');
//make the enemies move randomly every second
//make a player that is draggable
//detect collisions
//keep track of score
