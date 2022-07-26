console.log('Client side javascript')





const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault() //do not let referesh the page
    const location = search.value 
    const url = '/weather?address='+location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent =" "
    messageThree.textContent=" "
    
    fetch(url).then((response)=>{
    response.json().then((parsedData)=>{
        if(parsedData.error){
            messageOne.textContent = parsedData.error
        }else{
            messageOne.textContent = parsedData.location
            messageTwo.textContent = parsedData.forecastData
            messageThree.textContent = parsedData.localtime
        // console.log(parsedData.location);
        // console.log(parsedData.forecastData);
        }
    })
})

    // console.log(location)
})