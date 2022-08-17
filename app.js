var qs = require('qs')
var http = require('http')
var path = require('path')
var socketio = require('socket.io')
var PORT = process.env.PORT || 3000

const express = require('express')
const app = require('express')()
var server = http.createServer(app);
var io = socketio(server);
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

//用 socket 方式建立連線
io.on('connection', function (socket) {
  socket.on('send-message', message => {
    socket.broadcast.emit('receive-message', message)
  })
})

server.listen(PORT, () => console.log('App is running'))