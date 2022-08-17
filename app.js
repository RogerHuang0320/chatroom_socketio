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
  console.log(socket.id)
  // 建立一個 "sendMessage" 的監聽
  socket.on("sendMessage", function (message) {
    console.log(message)
    // 當收到事件的時候，也發送一個 "allMessage" 事件給所有的連線用戶
    io.emit("allMessage", message)
  })
})

server.listen(PORT, () => console.log('App is running'))