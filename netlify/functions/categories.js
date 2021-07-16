//try to return the categories that correspond to each item from firebase categories collection

//.netlify/functions/categories?items=mango,bread,onion

let firebase = require('./firebase')

exports.handler = async function(event) {
    
  let db = firebase.firestore()

  // perform a query against firestore for all items/categories, wait for it to return, store in memory
  //let categoryQuery = await db.collection(`categories`).where(`item`,`==`,parsed[1]).get()

  // retrieve the documents from the query
 
  
  let returnValue = []
  //console.log(event.queryStringParameters)
  let test = event.queryStringParameters.items
  
  let parsed = test.split(',')

// This works
    //returnValue.push(parsed) This works
    // returnValue.push(parsed[1]) //These work too
    // returnValue.push(parsed[2])
    // returnValue.push(parsed.length)

    //Expand this to for loop

    // //This is now working
      for (let i=0;i<parsed.length;i++) {
        //Pull the document for this specific item (relying on their only being 1)  
        let categoryQuery = await db.collection(`categories`).where(`item`,`==`,parsed[i]).get()
        
        //Extract the document/data and get the category
        let categories = categoryQuery.docs
        let cat = categories[0].data().category

        

        let itemObject = {
          item: parsed[i],
          category: cat
        }

       returnValue.push(itemObject)
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify(returnValue)
      }
    }