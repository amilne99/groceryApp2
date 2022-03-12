//try to return the categories that correspond to each item from firebase categories collection

//.netlify/functions/recipeItems?recipes=test2

//Filter for unique values
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

exports.handler = async function(event) {
    

  
  // retrieve the documents from the query
 
  
  //Get the list of recipes requested
  let returnValue = []
  console.log(event.queryStringParameters)
  let recipeList = event.queryStringParameters.recipes
  
  let recipesSplit = recipeList.split(',')
   
  //Test what this looks like
//   console.log(recipesSplit)
// console.log(recipesSplit[0])
// console.log('hello')

   let db = firebase.firestore()

   //Retrieve the documents
    // Loop through each recipe
      for (let i=0;i<recipesSplit.length;i++) {
        //Pull the document for this recipe, assuming there is 1 for now
        let recipesQuery = await db.collection(`recipes`).where(`recipe`,`==`,recipesSplit[i]).get()
        
        //Extract the document/data and get the category
        let recipesDocs = recipesQuery.docs
        //Get the data
        //Hardcoding 10 items
        
        let recipeItemData = recipesDocs[0].data()
        //recipeItemData.item1
        returnValue.push(recipeItemData.item1)
        returnValue.push(recipeItemData.item2)
        returnValue.push(recipeItemData.item3)
        returnValue.push(recipeItemData.item4)
        returnValue.push(recipeItemData.item5)
        returnValue.push(recipeItemData.item6)
        returnValue.push(recipeItemData.item7)
        returnValue.push(recipeItemData.item8)
        returnValue.push(recipeItemData.item9)
        returnValue.push(recipeItemData.item10)
        
        // let itemObject = {
        //   item: parsed[i],
        //   category: cat
        // }

    //    returnValue.push(itemObject)
    }

    //Loop through and cut out blank values
    let filteredReturn = returnValue.filter(unique)
    filteredReturn = arrayRemove(filteredReturn,"")

    return {
        statusCode: 200,
        body: JSON.stringify(filteredReturn)
      }
    }