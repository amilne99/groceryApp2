

//Roads Function Section

// Define the roads functions
var roads = {};

//This takes 3 inputs (from, to and length) and adds that road, one where the first is the start point and the second where the second is the start point
function makeRoad(from, to, length) {
  function addRoad(from, to) {
    if (!(from in roads)) {
      roads[from] = {};
    }
    roads[from][to] = length;
  }
  addRoad(from, to);
  addRoad(to, from);
}

// This takes many inputs, builds 1 road for each of the groupings of 2 from the start point. Basically it lets you build roads more efficiently by not restating the start point
// function makeRoads(start) {
//   for (var i = 1; i < arguments.length; i += 2) {
//     makeRoad(start, arguments[i], arguments[i + 1]);
//   }
// }

//This seems to pull all the roads leaving from a certain place (basically, where can I go from here?)
function roadsFrom(place) {
  var found = roads[place];
  if (found === undefined) {
    console.log("No place named '" + place + "' found.");
  } else {
    return found;
  }
}


// Dijstra section

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
      return [distance[i],thePath];
    } else {
      console.log("no path");
    }
  }

  //--------------------------------------------------------------------------------


//Listen for page loading event, eventually change this to take an input of what store in the URL and listen for a click
window.addEventListener('DOMContentLoaded', async function() { 
  // Build the URL for our items API
let url = `/.netlify/functions/items`

// Fetch the url, wait for a response, store the response in memory
let response = await fetch(url)
console.log(response)

// Ask for the json-formatted data from the response, wait for the data, store it in memory
let itemsJson = await response.json()

//Establish reference to 
let itemsFormDiv = document.querySelector(`.item-options`)

for (var i = 0; i < itemsJson.length; i++) {

  itemsFormDiv.insertAdjacentHTML(`beforeend`,`<div><input type="checkbox" id="${itemsJson[i]}" name="item" value="${itemsJson[i]}"> <label for="coding">${itemsJson[i]}</label></div>`)
  
  console.log(itemsJson[i])
}
})


let newpathButton = document.querySelector(`.newpath`)

//Handle if they click on the new roads button, taking them to the page to add
newpathButton.addEventListener(`click`, function(event) {

  document.location.href = `postPaths.html`

})


//Pull firebase database

//For the length of the database, loop through

//Add the from and to to an array

//Post it to console log as a test



// Set submit button as an object
let submitButton = document.querySelector(`#list-button`)

// Listen for the click
submitButton.addEventListener(`click`, async function(event) {
  // ignore the default behavior
  event.preventDefault()

  //Process information input into array

  //Setup a blank array
  var array = []
  //Build an array for categories that correspond to items chosen
  var categoryArray = []
  //Look for what is checked
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  console.log(checkboxes)

  //Run a loop to build a URL that can be used in lambda function to get the corresponding items


  //Push all those where checked into an array
  for (var i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value)
  }

  console.log(array)

  

    //Run the brain portion with the objects in the array in a for loop

  var items = array;
  var order = "<br> start";
  var startPoint = "start";
  var path = [];

// document.addEventListener(`DOMContentLoaded`, async function(event) {
// Build the URL for our roads API
let url = `/.netlify/functions/roads`

// Fetch the url, wait for a response, store the response in memory
let response = await fetch(url)

// Ask for the json-formatted data from the response, wait for the data, store it in memory
let json = await response.json()

// Write the json-formatted data to the console in Chrome
//console.log(json)

//Loop through json
for (let i=0;i<json.length; i++) {
    makeRoad(json[i].from,json[i].to,json[i].distance)
    // console.log(json[i].from)
    // console.log(json[i].to)
    // console.log(json[i].distance)
}

// makeRoad("start", "apple", 1)
// makeRoad("start", "eggs", 2)
// makeRoad("start", "nuts", 2)
// makeRoad("start", "end", 1)
// makeRoad("meat", "eggs", 1)
// makeRoad("meat", "juice", 2)
// makeRoad("apple", "meat", 1)
// makeRoad("eggs", "juice", 1.7)
// makeRoad("eggs",  "end", 1)
// makeRoad("eggs", "nuts", 2)
// makeRoad("juice", "nuts", 1);
// makeRoad("nuts", "end", 1);

while ( items.length > 0){
//For each item on the list, set a minimum distance that is quite high so you can try to beat it
	var minDist = 100;
	var ClosestItem;
  var ClosestPath;

	for(i=0 ; i<items.length ; i++){
		// Check is the dijstra to the next item is closer, if so update it
    var values = Dijkstra(roads, startPoint, items[i]);
    
    var DijkstraDistance = values[0];
    var DijsktraPath = values[1];
    console.log(values);

		if(DijkstraDistance < minDist){
			minDist = DijkstraDistance;
      console.log(minDist);
			ClosestItem = items[i];
      ClosestPath = DijsktraPath;
      console.log(`closest path is ${ClosestPath}`)
		}
		//console.log(items)
	}

	// Update the start point to be the item you chose to go to and repeat the next step
	startPoint = ClosestItem;

	//adding to the path
	order += " --> " + startPoint + " (via " + ClosestPath +") <br>";
  // path += "(via" + ClosestPath;
	//deleteing the item from the array so you don't check it again
	var index = items.indexOf(ClosestItem);
	if (index > -1) {
   		items.splice(index, 1);
	}
	//console.log(items);

}
//This is the final output
console.log(order)
console.log(path)

  let formdiv = document.querySelector(`.list-form`)
    
  formdiv.innerHTML = `<div> </div>`

  let outputdiv = document.querySelector(`.output`)

  outputdiv.insertAdjacentHTML(`beforeend`,`this is what you should do: ${order} <br>  and ${path} `)
})
// Listen for the submit button click

//Prevent default behaviour



//Run the brain portion with the objects in the array (+start)

//Wipe the form 

//Write to html the result (in most basic form)


// document.addEventListener(`DOMContentLoaded`, async function(event) {
// // Build the URL for our roads API
// let url = `/.netlify/functions/roads`

// // Fetch the url, wait for a response, store the response in memory
// let response = await fetch(url)

// // Ask for the json-formatted data from the response, wait for the data, store it in memory
// let json = await response.json()

// // Write the json-formatted data to the console in Chrome
// console.log(json)

// //Loop through json
// for (let i=0;i<json.length; i++) {
//     makeRoad(json[i].from,json[i].to,json[i].distance)
//     console.log(json[i].from)
//     console.log(json[i].to)
//     console.log(json[i].distance)
// }

// makeRoad("start", "apple", 1)
// // makeRoad("start", "eggs", 2)
// makeRoad("start", "nuts", 2)
// makeRoad("start", "end", 1)
// makeRoad("meat", "eggs", 1)
// makeRoad("meat", "juice", 2)
// makeRoad("apple", "meat", 1)
// makeRoad("eggs", "juice", 1.7)
// makeRoad("eggs",  "end", 1)
// makeRoad("eggs", "nuts", 2)
// makeRoad("juice", "nuts", 1);
// makeRoad("nuts", "end", 1);

// console.log("User wants to buy the following items: meat, eggs, and juice");
// //console.log(order);
// //making an array of items

// //
// //This will be a key input to try to make variable
// //
// var items = ["meat","eggs","juice"];
// var order = "start";
// var startPoint = "start";

// while ( items.length > 0){
// //For each item on the list, set a minimum distance that is quite high so you can try to beat it
// 	var minDist = 100;
// 	var ClosestItem;

// 	for(i=0 ; i<items.length ; i++){
// 		// Check is the dijstra to the next item is closer, if so update it
// 		if(Dijkstra(roads, startPoint, items[i]) < minDist){
// 			minDist = Dijkstra(roads, startPoint, items[i]);
// 			ClosestItem = items[i];
// 		}
// 		//console.log(items)
// 	}
// 	//alert("closest item is: " + ClosestItem);
// 	// Update the start point to be the item you chose to go to and repeat the next step
// 	startPoint = ClosestItem;

// 	//adding to the pah
// 	order += " --> " + startPoint;

// 	//deleteing the item from the array so you don't check it again
// 	var index = items.indexOf(ClosestItem);
// 	if (index > -1) {
//    		items.splice(index, 1);
// 	}
// 	//console.log(items);

// }
// //This is the final output
// console.log(order)

















// //Make road for each element of json

// //Check to see if roads is up to date
// })
// // Grab a reference to the element with class name "posts" in memory
// let postsDiv = document.querySelector(`.posts`)

// // Loop through the JSON data, for each Object representing a post:
// for (let i=0; i < json.length; i++) {
//   // Store each object ("post") in memory
//   let post = json[i]

//   // Store the post's ID in memory
//   let postId = post.id

//   // Create an empty string for the comments
//   let comments = ``

// }








//----------------------------------------------------------------------------------



//
//So for a given store, we should be able to store the "roads" data that results in Firebase, if it isn't too complicated to be stored in it's current function
//

// makeRoads("start", "apple", 1.1, "eggs", 2, "nuts", 2, "end", 1);
// makeRoads("apple", "meat", 1);
// makeRoads("meat", "eggs", 1, "juice", 2);
// makeRoads("eggs", "juice", 1.7, "end", 1, "nuts", 2);
// makeRoads("juice", "nuts", 1);
// makeRoads("nuts", "end", 1);




// makeRoads("start", "apple", 2, "eggs", 2, "nuts", 3, "end", 1);
// makeRoads("apple", "meat", 1, "juice", 2, "end", 1, "nuts", 2, "candy",1);
// makeRoads("meat", "eggs", 1, "juice", 2, "candy", 2,"other",3,"random",2);
// makeRoads("eggs", "juice", 2, "end", 1, "nuts", 2,"random",2);
// makeRoads("juice", "nuts", 2, "beans",1, "rice",0.5, "sauce",0.5);
// makeRoads("nuts", "end", 1, "beans",1, "rice",0.5);
// makeRoads("milk","eggs",0.5,"beans",1, "rice",0.5)

//console.log(roads)

