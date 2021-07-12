// Implemeting Dijkstra's algorithm

//This is defining the function. Take in the roads, the start point and the endpoint to find the shortest distance
function Dijkstra(roads, source, dest) {
    //Define variables and objects
    var inf = Number.POSITIVE_INFINITY;
    var distance = {};
    var done = {};
    var pred = {};
    //Build out arrays of infinite distances, falses to try to beat
    for (var i in roads) {
      // Unknown distance function from source to i.
      distance[i] = inf;
      pred[i] = 0;
      done[i] = false;
    }
    
    // Distance from source to source = 0
    distance[source] = 0;
    
    //If you beat it, make that the new minimum, set closest as j
    for (i in roads) {
      var minDist = inf, closest;
      for (var j in roads) {
        if (!done[j]) {
          if (distance[j] <= minDist) {
            minDist = distance[j];
            closest = j;
          }
        }
      }
      done[closest] = true;
      if (closest === dest) {
        break;
      }
      //Compile the full list? 
      var neighbors = roadsFrom(closest);
      for (var nb in neighbors) {
        var w = neighbors[nb];
        if (!done[nb]) { 
          if (distance[closest] + w < distance[nb]) {
            distance[nb] = distance[closest] + w;
            pred[nb] = closest;
          }// if
        }// if
      }//for 
    }// for(i in roads) 
     
    // Done, now print
    i = dest;
    if (distance[i] < inf) {
      var thePath = i;
      var place = i;
      while (place !== source) {
        place = pred[place];
        if (place !== source) {
          thePath = place + '->' + thePath;
        }
      }
      thePath = place + '->' + thePath;
      console.log("Distance from " + source + "-->" + dest + " : " + distance[i] + ' (' + thePath + ')');
      //console.log(distance);
      //console.log(thePath);
      return distance[i];
    } else {
      console.log("no path");
    }
  }
  
  
  
  // makeRoads("A", "B", 2, "C", 3);
  // makeRoads("B", "C", 3, "D", 6);
  // makeRoads("C", "D", 3, "E", 5);
  // makeRoads("D", "E", 1, "F", 3);
  // makeRoads("E", "F", 1);
  
  
  // function init() {
  //   var s = 'A--2-B--6-D--3-F \n';
  //   s = s + ' \\   |   /|   / \n';
  //   s = s + '  3  3  3 1  1   \n';
  //   s = s + '   \\ | /  | /   \n';
  //   s = s + '     C--5-E      \n';
  //   print(s, "pre");
  // }
  
  // init();
  // Dijkstra(roads, "A", "F");
  // Dijkstra(roads, "E", "B");
  
  