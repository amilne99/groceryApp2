

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

  //Unique values only

  const unique = (value, index, self) => {
    return self.indexOf(value) === index
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
  let itemsFormDiv = document.querySelector(`#item-options`)

  //Add all the items to the page with checkbxoes
  for (var i = 0; i < itemsJson.length; i++) {

    itemsFormDiv.insertAdjacentHTML(`beforeend`,
    `<div class="text-base font-normal px-2">
    <input type="checkbox" class="item-checkbox" id="${itemsJson[i].item}" name="item" value="${itemsJson[i].item}"> 
    <label>${itemsJson[i].item}</label></div>`)
    
    console.log(itemsJson[i])
  }

  //Now add all the recipes to the page
  let urlRecipe = `/.netlify/functions/recipes`

  // Fetch the url, wait for a response, store the response in memory
  let responseRecipe = await fetch(urlRecipe)
  console.log(responseRecipe)

  // Ask for the json-formatted data from the response, wait for the data, store it in memory
  let recipesJson = await responseRecipe.json()

  //Establish reference to div to post to
  let recipesFormDiv = document.querySelector(`#recipe-options`)

  //Add list of recipes as lines in HTML
  for (var i = 0; i < recipesJson.length; i++) {

    recipesFormDiv.insertAdjacentHTML(`beforeend`,
    `<div class="text-base font-normal px-2">
    <input type="checkbox" class="recipe-checkbox" id="${recipesJson[i].recipeName}" name="item" value="${recipesJson[i].recipeName}"> 
    <label>${recipesJson[i].recipeDisplay}</label>
    </div>`)
    
    console.log(recipesJson[i])
  }

})

//Look for the search bar here
let searchBar = document.querySelector(`#searchBar`)

//Listen for event with search bar
searchBar.addEventListener('keyup', function(event){

  let searchContent = event.target.value.toLowerCase()

   //This does it for items
  //get the full list of items from the sections
  let itemListMaster = document.querySelector("#item-options");

  //get specific items by accessing the label
  let itemListNew = itemListMaster.getElementsByTagName("label")
  //get the full section that is posted so eventually it can be removed
  let itemListCore = itemListMaster.getElementsByTagName("div")
  //Loop through all the items
  for (i = 0; i < itemListNew.length; i++){
  //Look at the item name to see if it matches the search
  a = itemListNew[i].innerHTML
  a = a.toLowerCase()

  txtValue = a.textContent || a.innerText

  if (a.indexOf(searchContent)== -1)  {itemListCore[i].style.display = "none"} else {itemListCore[i].style.display =""}
  }

  //Now let's replicate for recipes

  //get the full list of items from the sections
  let recipeListMaster = document.querySelector("#recipe-options");
  
  //get specific items by accessing the label
  let recipeListNew = recipeListMaster.getElementsByTagName("input")

  //get the full section that is posted so eventually it can be removed
  let recipeListCore = recipeListMaster.getElementsByTagName("div")

  //Loop through all the items
  for (i = 0; i < recipeListNew.length; i++){
  //Look at the item name to see if it matches the search
  a = recipeListNew[i].getAttribute("value")
  
  //Recipes may have caps so put to lower case to facillitate match
  a = a.toLowerCase()
  txtValue = a.textContent || a.innerText

  if (a.indexOf(searchContent)== -1)  {recipeListCore[i].style.display = "none"} else {recipeListCore[i].style.display =""}
   }
  
  
})


let newRecipeButton = document.querySelector(`.new-recipe`)

//Handle if they click on the new roads button, taking them to the page to add
newRecipeButton.addEventListener(`click`, function(event) {

  document.location.href = `postRecipes.html`

})

let newpathButton = document.querySelector(`.new-path`)

//Handle if they click on the new roads button, taking them to the page to add
newpathButton.addEventListener(`click`, function(event) {

  document.location.href = `postPaths.html`

})


// Set submit button as an object
let submitButton = document.querySelector(`#list-button`)

// Listen for the click, take all the items, send them to Categories.js, get back the list of categories, remove duplicates and proceed
submitButton.addEventListener(`click`, async function(event) {
  // ignore the default behavior
  event.preventDefault()

  //Process information input into array

  //Look for what is checked
 
  var itemCheckboxes = document.querySelectorAll(`input.item-checkbox:checked`)
  console.log(itemCheckboxes)
  var recipeCheckboxes = document.querySelectorAll(`input.recipe-checkbox:checked`)
  console.log(recipeCheckboxes)
 
  //console.log(itemCheckboxes)

  //For recipe Checkboxes need to send those selected to an API that returns all those items that are included in that recipe

   //Setup blank arrays
  var itemArray = []
  var recipeArray = []

  //Run a loop to build a URL that can be used in recipe lambda function to get the corresponding items
  for (var h = 0; h < recipeCheckboxes.length; h++) {
    recipeArray.push(recipeCheckboxes[h].value)
  }

  //Build the URL and check it
  let recUrl = `/.netlify/functions/recipeItems?recipes=${recipeArray}`


  //Get the json response of items from the URL 
  if (recipeArray.length>0) {
    let recipesItemsResponse = await fetch(recUrl)
    let recipesItemsJson = await recipesItemsResponse.json()

    for (var k = 0; k < recipesItemsJson.length; k++) {
      itemArray.push(recipesItemsJson[k])
    }
  }

  //Push all recipe items into array
  


  //Push all items  checked into array
  for (var i = 0; i < itemCheckboxes.length; i++) {
    itemArray.push(itemCheckboxes[i].value)
  }

  //Build the Url for our API for getting categories
  let catUrl = `/.netlify/functions/categories?items=${itemArray}`  
  //This looks good, console.log(`this is array ${itemArray}`)
  console.log(catUrl)
  
  // Fetch the url, wait for a response, store the response in memory
  let itemsResponse = await fetch(catUrl)

  // Ask for the json-formatted data from the response, wait for the data, store it in memory
  let itemsJson = await itemsResponse.json()

  // Write the json-formatted data to the console in Chrome
  console.log(itemsJson)
  

  let itemsList = []
  let categoriesList = []
  //Add all the items to their respective lists
  for (let i=0;i<itemsJson.length; i++) {
    itemsList.push(itemsJson[i].item)
    categoriesList.push(itemsJson[i].category)

  }
  //Remove duplicates
  categoriesList = categoriesList.filter(unique)

  console.log(`items list is ${itemsList}`)
  console.log(categoriesList)

    //Run the brain portion with the objects in the array in a for loop
  //Roads and itmes are now at category level
 

// document.addEventListener(`DOMContentLoaded`, async function(event) {
// Build the URL for our roads API
let url = `/.netlify/functions/roads`

// Fetch the url, wait for a response, store the response in memory
let roadsResponse = await fetch(url)

// Ask for the json-formatted data from the response, wait for the data, store it in memory
let json = await roadsResponse.json()

// Write the json-formatted data to the console in Chrome
console.log(json)

//Loop through json
for (let i=0;i<json.length; i++) {
    makeRoad(json[i].from,json[i].to,json[i].distance)
    // console.log(json[i].from)
    // console.log(json[i].to)
    // console.log(json[i].distance)
}

var destinations = categoriesList;
var order = "";
//Establish start point
var startPoint = "start";
//Blank for path
var path = [];
var counter = 1;

let outputdiv = document.querySelector(`.output`)
  
outputdiv.insertAdjacentHTML(`beforeend`,`Here is your smart shopping path:`)

console.log(`roads`)

console.log(roads)

while ( destinations.length > 0){
//For each item on the list, set a minimum distance that is quite high so you can try to beat it
	var minDist = 100;
	var ClosestItem;
  var ClosestPath;
  
  

  //This sub loop checks all for the closest and constantly updates
	for(i=0 ; i<destinations.length ; i++){
		
    //Put in roads, start and target and get the minimum distance between those categories and the path out
    var values = Dijkstra(roads, startPoint, destinations[i]);
    var DijkstraDistance = values[0];
    var DijsktraPath = values[1];
    //console.log(values);

    //If this item is closer than the current minimum, then replace it until you have a winner
		if(DijkstraDistance < minDist){
			minDist = DijkstraDistance;
      //console.log(minDist);
			ClosestItem = destinations[i];
      ClosestPath = DijsktraPath;
      //console.log(`closest path is ${ClosestPath}`)
		}
		//console.log(destinations)
	}

	// Update the start point to be the item you chose to go to and repeat the next step
	startPoint = ClosestItem;
  console.log(startPoint)
	//adding the number and the next category to the path plus open brackets for th items
	order +=  `<strong> ${counter}) `+ startPoint +`</strong> (`;
  //" (via " + ClosestPath +") <br>"
  // path += "(via" + ClosestPath;

  //Check which items are being hit by that category
  for (j=0; j<itemsJson.length;j++){
    //If the category matches the destination

    //This is working now just need it to splice the list (not necessary for now) and add the items in parentheses so it's category (item, item)-> category (item, item)
    if (itemsJson[j].category==ClosestItem){
      order += itemsJson[j].item + ", "
    }
  }
  order = order.slice(0, -2)
  //Add close brackets and line break when done
  order += ")"

  //deleteing the category from the array so you don't check it again
	var index = destinations.indexOf(ClosestItem);
  counter += 1;

	if (index > -1) {
   		destinations.splice(index, 1);
	}
	//console.log(items);

  //Push the next line to order 
  outputdiv.insertAdjacentHTML(`beforeend`,`<div class="output-list">
  <input type="checkbox" class="output-checkbox" value="${ClosestItem}"> 
  <label>${order}</label></div>`)
  console.log(`The order line is ${order}`)
  //Then reset it
  order = ""

  
  // //Find the output div and send closest item row to it in HTML 
  // let outputdiv = document.querySelector(`.output`)

  // let outputContent = outputdiv.innerHTML
  // console.log(outputContent.length)
  
  // outputdiv.insertAdjacentHTML(`beforeend`,`<div class="output-list">
  //   <input type="checkbox" class="output-checkbox" value="${ClosestItem}"> 
  //   <label>${order}</label></div>`)

}
//This is the final output
//console.log(order)
//console.log(path)

//This adds a button to refresh the page once options have been submitted
  let refreshdiv = document.querySelector(`.refresh-page`)

  refreshdiv.insertAdjacentHTML(`beforeend`,`<button class="button">Return to Home</button>`)

  let formdiv = document.querySelectorAll(`.to-clear`)

  formdiv.forEach(function(item) {
    item.innerHTML = "";
  })
  //formdiv.innerHTML = `<div> </div>`


  //Drop back here if issues
  
})

let refreshButton = document.querySelector(`.refresh-page`)

refreshButton.addEventListener(`click`, function(event) {

  location.reload()

})

//Remove checkbox items in the output area when they are checked so people can tick sections that are done
document.body.addEventListener('click',function(event) {
  console.log("hello")
  
  //Find the selected checkboxes
  let selectedCheckboxes = document.querySelectorAll(".output input[type=checkbox]:checked")

  selectedCheckboxes.forEach(function(item) {
    item.parentElement.style.display = "none";
  })


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

