const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }

//When the page loads, pull the categories that are currently entered to give the user some relevant options rather than starting from scratch

window.addEventListener('DOMContentLoaded', async function() { 
    // Build the URL for our items API
  let url = `/.netlify/functions/items`
  
  // Fetch the url, wait for a response, store the response in memory
  let response = await fetch(url)

  console.log(response)
  
  // Ask for the json-formatted data from the response, wait for the data, store it in memory
  let itemsJson = await response.json()
  
  //let categoryJson = itemsJson.filter(unique)
  
  //Establish reference to divs

  let categoryArray = []
  
  //This loop makes an array with all the categories only
  for (var i = 0; i < itemsJson.length; i++) {
    
    categoryArray[i]= itemsJson[i].category
  }
  //Remove duplicates from category array
  let categoryArraySlim = categoryArray.filter(unique)

  //Establish reference to divs
  let categoryDiv = document.querySelector(`#categoryOptions`)
  let fromCategoryDiv = document.querySelector(`#fromCategoryOptions`)
  let toCategoryDiv = document.querySelector(`#toCategoryOptions`)
//Make the list of options appear in the HTML for categories
  for (var j = 0; j < categoryArraySlim.length; j++) {
  
    categoryDiv.insertAdjacentHTML(`beforeend`,`<option value="${categoryArraySlim[j]}">`)
    fromCategoryDiv.insertAdjacentHTML(`beforeend`,`<option value="${categoryArraySlim[j]}">`)
    toCategoryDiv.insertAdjacentHTML(`beforeend`,`<option value="${categoryArraySlim[j]}">`)

  }

  })

  let submitButton = document.querySelector(`.create-item`)

// Listen for the click
submitButton.addEventListener(`click`, async function(event) {
  // ignore the default behavior
  event.preventDefault()  
  console.log(`button was clicked`)
  //get references to the input holding the info
  let categoryInput = document.querySelector(`#categoryEntry`)
  let item1Input =document.querySelector(`#item1`)
  let item2Input=document.querySelector(`#item2`)
  let item3Input=document.querySelector(`#item3`)
  let item4Input=document.querySelector(`#item4`)
  let item5Input=document.querySelector(`#item5`)
  let categoryFromInput = document.querySelector(`#fromCategoryEntry`)
  let categoryToInput = document.querySelector(`#toCategoryEntry`)
  let distanceInput = document.querySelector(`#roadDistance`)
  
  //Store the user inputted values 
  let category = categoryInput.value
  let item1= item1Input.value
  let item2= item2Input.value
  let item3= item3Input.value
  let item4= item4Input.value
  let item5= item5Input.value
  let categoryFrom = categoryFromInput.value
  let categoryTo = categoryToInput.value
  let distance = distanceInput.value 

  let url = `/.netlify/functions/createPaths?category=${category}&item1=${item1}&item2=${item2}&item3=${item3}&item4=${item4}&item5=${item5}&categoryFrom=${categoryFrom}&categoryTo=${categoryTo}&distance=${distance}`

  let response = await fetch(url)

  let completeddiv = document.querySelector(`.completed-entry`)

  setTimeout(location.reload.bind(location), 4000)

  completeddiv.insertAdjacentHTML(`beforeend`,`Success! Thanks for submitting your info. The page will refresh now.`)
  //This isn't quite working. Maybe just wipe the html and add links to main page or to refresh this page? 

})
