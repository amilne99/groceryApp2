const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }

//When the page loads, listen for click to return to home or submit items. If submit, send that items to url

window.addEventListener('DOMContentLoaded', async function() { 
console.log("loaded")
let submitButton = document.querySelector(`.submitButton`)

//Here we will popoulate the dropdowns with items found

  // Build the URL for our items API
let url = `/.netlify/functions/items`

// Fetch the url, wait for a response, store the response in memory
let response = await fetch(url)
console.log(response)

// Ask for the json-formatted data from the response, wait for the data, store it in memory
let itemsJson = await response.json()

//FIX THIS HARDCODED
for (var j=1; j<=10;j++){
//Establish reference to the 
let itemsOptionDiv = document.querySelector(`#item${j}`)

//Loop through all the items and add them as dropdown option
console.log(itemsOptionDiv)
itemsOptionDiv.insertAdjacentHTML(`beforeend`, `<option value="" disabled selected hidden>Please Choose...</option>`)
for (var i = 0; i < itemsJson.length; i++) {
  itemsOptionDiv.insertAdjacentHTML(`beforeend`, `<option value="${itemsJson[i].item}">${itemsJson[i].item}</option>`)
  //console.log(itemsJson[i])
}}


// Listen for the click
submitButton.addEventListener(`click`, async function(event) {
  // ignore the default behavior
  event.preventDefault()  
  console.log(`button was clicked`)
  //get references to the input holding the info
  let recipeInput = document.querySelector(`#recipeInput`)
  let item1Input =document.querySelector(`#item1`)
  let item2Input=document.querySelector(`#item2`)
  let item3Input=document.querySelector(`#item3`)
  let item4Input=document.querySelector(`#item4`)
  let item5Input=document.querySelector(`#item5`)
  let item6Input =document.querySelector(`#item6`)
  let item7Input=document.querySelector(`#item7`)
  let item8Input=document.querySelector(`#item8`)
  let item9Input=document.querySelector(`#item9`)
  let item10Input=document.querySelector(`#item10`)
  
  
  //Store the user inputted values 
  let recipe = recipeInput.value
  let item1= item1Input.value
  let item2= item2Input.value
  let item3= item3Input.value
  let item4= item4Input.value
  let item5= item5Input.value
  let item6= item6Input.value
  let item7= item7Input.value
  let item8= item8Input.value
  let item9= item9Input.value
  let item10= item10Input.value

  console.log(item9Input.value)

  let url = `/.netlify/functions/createRecipe?recipe=${recipe}&item1=${item1}&item2=${item2}&item3=${item3}&item4=${item4}&item5=${item5}&item6=${item6}&item7=${item7}&item8=${item8}&item9=${item9}&item10=${item10}`
    console.log(url)
  let response = await fetch(url)

  let completeddiv = document.querySelector(`.completed-entry`)

  setTimeout(location.reload.bind(location), 4000)

  completeddiv.insertAdjacentHTML(`beforeend`,`Success! Thanks for submitting your info. The page will refresh now.`)
  //This isn't quite working. Maybe just wipe the html and add links to main page or to refresh this page? 

})
})