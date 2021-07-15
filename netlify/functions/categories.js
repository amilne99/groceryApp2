//try to return the categories that correspond to each item from firebase categories collection


exports.handler = async function(event) {
    let firebase = require(`./firebase`)
    let db = firebase.firestore()
    
    let returnValue = []
    //Query items
    
    //Updated to pull from categories items now
    let itemsQuery = await db.collection(`categories`).get()
    
    let items = itemsQuery.docs
    
    for (let i=0;i< items.length; i++) {
        //Get the data from the road
        let itemData = items[i].data()
        
        //Updated to pull from categories items now
        returnValue.push(itemData.item)
        //returnValue.push(itemData.from)
        //returnValue.push(itemData.to)
    }
    return {
        statusCode: 200,
        body: JSON.stringify(itemsList)
      }
    }