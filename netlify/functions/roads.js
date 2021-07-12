//This pulls the roads from firebase in an interpretable format

//allow us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
// establish a connection to firebase in memory
	let db = firebase.firestore()
  let returnValue = []

    //Ask firebase for documents
	let roadsQuery = await db.collection(`stores`).get()

    // Get documents from the query
	let roads = roadsQuery.docs


	//Run a loop to go through roads in store from Firebase
	for (let i=0;i< roads.length; i++) {
		//Get the data from the road
        let roadData = roads[i].data()
		let roadObject = {
            from: roadData.from,
            to: roadData.to,
            distance: roadData.distance
        }
		
        returnValue.push(roadObject)
	}


return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}
// Create a road for each one 