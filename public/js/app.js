// Client side javascript. Use the fetch API. Only works in the browsers.
// Takes url as the argument, works in async, uses 'then' API.
// response.json() parses the json data received.

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input') // Matches the first element.
const messageOne = document.querySelector('#message-1') // # is used to target id.
const messageTwo = document.querySelector('#message-2') 


// Add a listener.
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // Prevents the page from reloading on submit listener.

    const address = searchInput.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '

    if(address == ''){
        console.log('Please enter an address.')
    } else{
        
        const url = 'http://localhost:3000/weather?address=' + encodeURI(address)

        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                } else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    }
})