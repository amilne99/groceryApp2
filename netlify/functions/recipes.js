//http://localhost:8888/.netlify/functions/recipes

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

//Pull the recipes ordered based on name
let recipesQuery = await db.collection(`recipes`).orderBy('recipe').get()

let recipes = recipesQuery.docs

for (let i=0;i< recipes.length; i++) {
    //Get the data from the road
    let recipeData = recipes[i].data()
    console.log(recipeData)
    //Updated to pull from categories items now
    itemsList = [recipeData.item1, recipeData.item2, recipeData.item3, recipeData.item4].filter(Boolean).join(", ")  
    
    let recipeDisplay = recipeData.recipe + " (" + itemsList +")"
    
    let recipeObject = {
      recipeName: recipeData.recipe,
      recipeDisplay: recipeDisplay 
    }
    returnValue.push(recipeObject)

    //returnValue.push(itemData.from)
    //returnValue.push(itemData.to)
    }

    let recipesList = returnValue.filter(unique)
   // sample only
  return {
    statusCode: 200,
    body: JSON.stringify(recipesList)
  }
}