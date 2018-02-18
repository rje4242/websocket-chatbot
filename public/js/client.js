'use strict'

const ws = new WebSocket('ws://localhost:3030')

// Test to add unique id
// For ex with timestamp?
// let userId = new Date(s)
// console.log(userId)

ws.addEventListener('open', () => {
  // ws.send(`haiii [from: CLIENT]`)
})

let userId
// Get a unique id stamp
userId = new Date()
console.log(`userId: ${userId}`)

// WebSocket on connection
ws.onopen = (message) => {
  console.log(`socket connection: [client]`)
  console.log(message.data)
}

// WebSocket on close
ws.onclose = () => console.log('socket disconnnected')

// WebSocket emit message
ws.onmessage = (message) => {
  printMessage(message.data)
  // console.dir(message)
}

// Select our form that will contain the messages
const chatForm = document.querySelector('.chat-form')
// Select the chat messages area, for auto scrolling
const phoneCase = document.querySelector('.phone-case')

chatForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = document.getElementById('message')
  // Send input to server
  ws.send(input.value)
  // Clean up input field
  input.value = ''
})

// I have built a function that scrolls the chat field
// To create a proper 'auto-scrolling' when new messages
// are recieved
const scrollDown = (element, parent) => {
  // console.log('scrollDown()')
  const topPos = element.offsetTop
  // console.log(topPos)
  parent.scrollTop = topPos
}

// If we create them beforehand, can we optimize?
// const li = document.createElement('li')
// const p = document.createElement('p')

// Create a 'create element' function
const newElement = (element) => {
  return document.createElement(element)
}

// Give msg timestamps
const timeStamp = () => {
  const time = new Date()
  console.log(time)
  return time.toLocaleTimeString()
}

// Print user/cpu message to document
const printMessage = (message) => {
  const time = timeStamp()
  // console.log(message)
  const li = newElement('li')
  const p = newElement('p')
  if (message.includes('Bot') || message === 'Welcome') {
    li.classList = 'chat__box chat__box--cpu'
    p.classList = 'chat__text chat__text--cpu'
  } else {
    li.classList = 'chat__box chat__box--user'
    p.classList = 'chat__text chat__text--user'
  }
  li.innerHTML = `<header>${time}</header>`
  p.innerText = `${message}`
  document.querySelector('ul.messages').appendChild(li).appendChild(p)
  scrollDown(li, phoneCase)
}
