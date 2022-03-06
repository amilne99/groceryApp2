let firebase = require('./firebase')

exports.handler = async function(event) {

    let recipe = event.queryStringParameters.recipe
    let item1 = event.queryStringParameters.item1
    let item2 = event.queryStringParameters.item2
    let item3 = event.queryStringParameters.item3
    let item4 = event.queryStringParameters.item4
    let item5 = event.queryStringParameters.item5
    let item6 = event.queryStringParameters.item6
    let item7 = event.queryStringParameters.item7
    let item8 = event.queryStringParameters.item8
    let item9 = event.queryStringParameters.item9
    let item10 = event.queryStringParameters.item10

    let returnValue = [] 

    let db = firebase.firestore()

    if (recipe!=undefined && recipe.length!=0 && item1 !=undefined && item1.length !=0) {
        await db.collection(`recipes`).add({
            recipe: recipe,
            item1: item1,
            item2: item2,
            item3: item3,
            item4: item4,
            item5: item5,
            item6: item6,
            item7: item7,
            item8: item8,
            item9: item9,
            item10: item10
        })
    }



  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}