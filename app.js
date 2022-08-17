var http = require('http')
var path = require('path')
var socketio = require('socket.io')
var PORT = process.env.PORT || 3000
const formatMessage = require('./middleware/format-message')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./middleware/users')

const express = require('express')
const app = require('express')()
var server = http.createServer(app);
var io = socketio(server);
app.use(express.static(path.join(__dirname, 'public')))

//用 socket 方式建立連線
io.on('connection', function (socket) {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)
    socket.join(user.room)
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  })

  socket.on('send-message', message => {
    const user = getCurrentUser(socket.id)
    io.to(user.room).emit('receive-message', formatMessage(user.username, message))
  })

  socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    if (user) {
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    }
  })
})

server.listen(PORT, () => console.log('App is running'))