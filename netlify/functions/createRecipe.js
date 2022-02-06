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

    if (category!=undefined && category.length!=0 && item1 !=undefined && item1.length !=0) {
        await db.collection(`categories`).add({
            category: category,
            item: item1
        })
    }
    if (category!=undefined && category.length!=0 && item2 !=undefined && item2.length !=0) {
        await db.collection(`categories`).add({
            category: category,
            item: item2
        })
    }

    if (category!=undefined && category.length!=0 && item3 !=undefined && item3.length !=0) {
        await db.collection(`categories`).add({
            category: category,
            item: item3
        })
    }

    if (category!=undefined && category.length!=0 && item4 !=undefined && item4.length !=0) {
        await db.collection(`categories`).add({
            category: category,
            item: item4
        })
    }

    if (category!=undefined && category.length!=0 && item5 !=undefined && item5.length !=0) {
        await db.collection(`categories`).add({
            category: category,
            item: item5
        })
    }

    if (categoryFrom != undefined && categoryTo != undefined && distance != undefined  && categoryFrom.length != 0 && categoryTo.length != 0 && distance.le != 0){
        await db.collection(`stores2`).add({
            distance: parseFloat(distance),
            from: categoryFrom,
            to: categoryTo
        })

    }

  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}