const chatForm = document.querySelector('#chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.querySelector('#room-name')
const userList = document.querySelector('#users')
const socket = io()

// get username & room name for URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room)
  outputUsers(users)
})

socket.emit('joinRoom', { username, room })

socket.on('receive-message', message => {
  outputMessage(message)
})

chatForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const message = event.target.elements.msg.value
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

function outputRoomName(room) {
  roomName.innerText = room
}

function outputUsers(users) {
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `
}