//http://localhost:8888/.netlify/functions/roads

//This pulls the roads from firebase in an interpretable format

//allow us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {
// establish a connection to firebase in memory
	let db = firebase.firestore()
  let returnValue = []

  //
  //To work on: This will allow user input to pull the store specific info if named right. Could build a collection of store names and what is shown to users
  //
  //let test = ""
  //let combo =  `stores` + test
  console.log(combo)
    //Ask firebase for documents
  let roadsQuery = await db.collection(`stores2`).get()
	// let roadsQuery = await db.collection(`${combo}`).get()

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