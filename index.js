// firebase.auth().onAuthStateChanged(async function(user) {
//   if (user) {
//     // Signed in
//     console.log('signed in')
//   } else {
//     // Signed out
//     console.log('signed out')

//     // Initializes FirebaseUI Auth
//     let ui = new firebaseui.auth.AuthUI(firebase.auth())

//     // FirebaseUI configuration
//     let authUIConfig = {
//       signInOptions: [
//         firebase.auth.EmailAuthProvider.PROVIDER_ID
//       ],
//       signInSuccessUrl: 'index.html'
//     }

//     // Starts FirebaseUI Auth
//     ui.start('.sign-in-or-sign-out', authUIConfig)
//   }
// })



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
function makeRoads(start) {
  for (var i = 1; i < arguments.length; i += 2) {
    makeRoad(start, arguments[i], arguments[i + 1]);
  }
}

//This seems to pull all the roads leaving from a certain place (basically, where can I go from here?)
function roadsFrom(place) {
  var found = roads[place];
  if (found === undefined) {
    console.log("No place named '" + place + "' found.");
  } else {
    return found;
  }
}

//
//So for a given store, we should be able to store the "roads" data that results in Firebase, if it isn't too complicated to be stored in it's current function
//

// makeRoads("start", "apple", 1.1, "eggs", 2, "nuts", 2, "end", 1);
// makeRoads("apple", "meat", 1);
// makeRoads("meat", "eggs", 1, "juice", 2);
// makeRoads("eggs", "juice", 1.7, "end", 1, "nuts", 2);
// makeRoads("juice", "nuts", 1);
// makeRoads("nuts", "end", 1);

//allow us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
// establish a connection to firebase in memory
	let db = firebase.firestore()

	let roadsQuery = await db.collection(``)

	let roads = roadsQuery.docs

	//Run a loop to go through roads in store from Firebase
	for (let i=0;i< roads.length; i++) {
		//Get the data from the road
		let roadData = roads[i].data()
		console.log(roadData.distance)
	}


return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}
//Create a road for each one 








makeRoad("start", "apple", 1.1)
makeRoad("start", "eggs", 2)
makeRoad("start", "nuts", 2)
makeRoad("start", "end", 1)
makeRoad("meat", "eggs", 1)
makeRoad("meat", "juice", 2)
makeRoad("apple", "meat", 1)
makeRoad("eggs", "juice", 1.7)
makeRoad("eggs",  "end", 1)
makeRoad("eggs", "nuts", 2)
makeRoad("juice", "nuts", 1);
makeRoad("nuts", "end", 1);



// makeRoads("start", "apple", 2, "eggs", 2, "nuts", 3, "end", 1);
// makeRoads("apple", "meat", 1, "juice", 2, "end", 1, "nuts", 2, "candy",1);
// makeRoads("meat", "eggs", 1, "juice", 2, "candy", 2,"other",3,"random",2);
// makeRoads("eggs", "juice", 2, "end", 1, "nuts", 2,"random",2);
// makeRoads("juice", "nuts", 2, "beans",1, "rice",0.5, "sauce",0.5);
// makeRoads("nuts", "end", 1, "beans",1, "rice",0.5);
// makeRoads("milk","eggs",0.5,"beans",1, "rice",0.5)

//console.log(roads)

console.log("User wants to buy the following items: meat, eggs, and juice");
//console.log(order);
//making an array of items

//
//This will be a key input to try to make variable
//
var items = ["meat","eggs","juice"];
var order = "start";
var startPoint = "start";

while ( items.length > 0){
//For each item on the list, set a minimum distance that is quite high so you can try to beat it
	var minDist = 100;
	var ClosestItem;

	for(i=0 ; i<items.length ; i++){
		// Check is the dijstra to the next item is closer, if so update it
		if(Dijkstra(roads, startPoint, items[i]) < minDist){
			minDist = Dijkstra(roads, startPoint, items[i]);
			ClosestItem = items[i];
		}
		//console.log(items)
	}
	//alert("closest item is: " + ClosestItem);
	// Update the start point to be the item you chose to go to and repeat the next step
	startPoint = ClosestItem;

	//adding to the pah
	order += " --> " + startPoint;

	//deleteing the item from the array so you don't check it again
	var index = items.indexOf(ClosestItem);
	if (index > -1) {
   		items.splice(index, 1);
	}
	//console.log(items);

}
//This is the final output
console.log(order)