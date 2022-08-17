const chatForm = document.querySelector('#chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.querySelector('#room-name')
const userList = document.querySelector('#users')
const socket = io()

// get username & room name for URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})
roomName.innerText = `${room}`
userList.innerText = `${username}`

socket.on('receive-message', message => {
  outputMessage(message)
})

chatForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const message = event.target.elements.msg.value
  console.log('msg', event.target.elements.msg)
  outputMessage(message)
  socket.emit('send-message', message)
})

function outputMessage(message) {
  const messageDiv = document.createElement('div')
  messageDiv.classList.add('message')
  messageDiv.innerHTML = `
  <p class="meta">${username}</p>
  <p class="text">${message}</p>
  `
  chatMessages.appendChild(messageDiv)
  chatForm.elements.msg.value = ``
}