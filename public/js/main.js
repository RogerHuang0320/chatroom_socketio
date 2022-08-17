const chatForm = document.querySelector('#chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.querySelector('#room-name')
const userList = document.querySelector('#users')

// get username & room name for URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

const socket = io()
socket.on('connection', () => {
  roomName.innerHTML += `
  12
  `
})