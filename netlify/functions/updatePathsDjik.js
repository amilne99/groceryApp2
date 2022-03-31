//Goal: Update the optimal paths using all roads that exist in the data and calculate shortest distance from each to each so that calculation is faster 

const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }

//Remove a value from an array
function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

let firebase = require('./firebase')

//Look for the right firebase collection

//Get documents

exports.handler = async function(event) {
let firebase = require(`./firebase`)
let db = firebase.firestore()

let returnValue = []
//Query items

//Updated to pull from categories items now
let itemsQuery = await db.collection(`categories`).orderBy('item').get()

let items = itemsQuery.docs

for (let i=0;i< items.length; i++) {
    //Get the data from the road
    let itemData = items[i].data()
    
    //Updated to pull from categories items now

    let itemObject = {
      item: itemData.item,
      category: itemData.category
    }
    returnValue.push(itemObject)
    //returnValue.push(itemData.from)
    //returnValue.push(itemData.to)
}


//Filter for unique values and remove start

let itemsList = returnValue.filter(unique)
itemsList = arrayRemove(itemsList,"start")
itemsList = arrayRemove(itemsList,"end")

   // sample only
  return {
    statusCode: 200,
    body: JSON.stringify(itemsList)
  }
}






// let firebase = require('./firebase')

// exports.handler = async function(event) {
//     console.log("hello")
//     let db = firebase.firestore()
//     //Query to get roads (destination) and stores2 (source info)
//     //let allRoadsQuery = await db.collection(`roads`).get()
//     //let roadsQuery = await db.collection(`stores2`).get()

// 	//let roads = roadsQuery.docs
    
//     //let allRoads = []
    
//     //Get all the roads in JSON format
//     // for (let i=0;i< roads.length; i++) {
// 	// 	//Get the data from the road
//     //     let roadData = roads[i].data()
// 	// 	let roadObject = {
//     //         from: roadData.from,
//     //         to: roadData.to,
//     //         distance: roadData.distance
//     //     }
		
//     //     allRoads.push(roadObject)
// 	// }

//     let categoryArray=[]
//     let itemsQuery = await db.collection(`categories`).orderBy('item').get()
//     let items = itemsQuery.docs
//     for (let i=0;i< items.length; i++) {
//     //Get the data from the road
//         let itemData = items[i].data()
//     //Updated to pull from categories items now
//     categoryArray.push(itemData.category)
// }
  

//   //Remove duplicates from category array
//   let categoryArraySlim = categoryArray.filter(unique)
//   let returnValue = categoryArraySlim
    
//     //For each category item loop through all other category items
//     //If the same, skip. If different, do Djikstra's using roads
//     //Post the Category as ID, then push 2nd category and djikstra distance as other piece of info


//   return {
//     statusCode: 200,
//     body: JSON.stringify("Hello World")
//   }
// }