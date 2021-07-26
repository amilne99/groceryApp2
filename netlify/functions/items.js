//http://localhost:8888/.netlify/functions/items


//Functions needed

//filtering for unique values
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