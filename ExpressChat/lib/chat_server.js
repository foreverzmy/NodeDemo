import SocketIO from 'socket.io'

export default chatServer;

function chatServer(server) {
  const io = new SocketIO(server);
  // io.set('log level', 1);
  // 定义每个用户连接的处理逻辑
  // io.on('connection', (socket) => {
  // 在用户连接上来时赋予其一个访客名
  // onlineCount = assignGuestName(socket, onlineCount, nickNames, namesUSed);
  // 用户连接时放入聊天室Lobby
  // joinRoom(socket, 'Lobby');
  // 处理用户的消息
  // handleMessageBroadcasting(socket, nickNames);
  // 处理用户更名
  // handleNameChangeAttempts(socket, nickNames, namesUesd);
  // 处理聊天室的变更或创建
  // handleRoomJoining(socket);
  // 用户发出请求时，向其提供已经被占用的聊天室的列表
  // socket.on('rooms', () => {
  //   socket.emit('rooms', io.sockets.manager.rooms);
  // });
  // 定义用户断开连接后的清除逻辑
  // handleClientDisconnection(socket, nickNames, namesUesd);
  // });
}

// 在用户连接上来时赋予其一个访客名
function assignGuestName(socket, onlineCount, nickNames, namesUesd) {
  let name = `Guest${onlineCount}`; //生成新昵称
  nickNames[socket.id] = name;
  socket.emit('nameResult', { // 让用户知道他们的昵称
    success: true,
    name: name
  });
  namesUesd.push(name); //存放已经被占用的昵称
  return onlineCount++; //昵称计数器
}

// 用户加入聊天室
function joinRoom(socket, room) {
  // 让用户进入房间
  socket.join(room);
  currentRoom[socket.id] = room;
  // 让用户知道进入了新房间
  socket.emit('joinResult', { room: room });
  // 让房间里其他用户知道有新用户进入了房间
  socket.broadcast.to(room).emit('message', {
    text: `${nickNames[socket.id]} has joined ${room}.`
  });
  // 确定有哪些用户在这个房间
  let usersInRoom = io.socket.client(room);
  //如果不止一个用户进入房间，汇总一下都有谁
  if (usersInRoom.length > 1) {
    let usersInRoomSummary = `$Users currently in {room}:`
    for (let index in usersInRoom) {
      let userSocketId = usersInRoom[index].id;
      if (userSocketId !== socket.id) {
        if (index > 0) {
          usersInRoomSummary += ',';
        }
        usersInRoomSummary += nickNames[userSocketId];
      }
    }
    // 将房间里的其他用户的汇总发送给这个用户
    usersInRoomSummary += '.';
    socket.emit('message', { text: usersInRoomSummary });
  }
}

// 处理用户更名
function handleNameChangeAttempts(socket, nickNames, namesUesd) {
  socket.on('nameAttempt', (name) => {
    // 昵称不能以Guest开头
    if (name.indexOf('Guest') == 0) {
      socket.emit('nameResult', {
        success: false,
        message: 'Name cannot begin with "Guset".'
      });
    } else {
      // 如果昵称没被注册就注册
      if (namesUesd.indexOf(name) == -1) {
        let previousName = nickNames[socket.id];
        let previousNameIndex = namesUesd.indexOf(previousName);
        namesUSed.push(name);
        nickNames[socket.id] = name;
        // 删掉之前用的昵称，让其他用户可以使用
        delete namesUSed[previousNameIndex];
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: `${previousName} is now known as ${name}.`
        });
      } else {
        // 如果昵称已被占用，给客户端发送错误消息
        socket.emit('nameResult', {
          success: false,
          message: 'That name is already in use.'
        })
      }
    }
  })
}

// 处理用户的消息
function handleMessageBroadcasting(socket) {
  socket.on('message', (message) => {
    socket.broadcast.to(message.room).emit('message', {
      text: `${nickNames[socket.id]}: ${message.text}`
    })
  })
}

// 创建房间
function handleRoomJoining(socket) {
  socket.on('join', (room) => {
    socket.leavel(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  })
}

// 定义用户断开连接后的清除逻辑
function handleClientDisconnection(socket) {
  socket.on('disconnect', () => {
    let nameIndex = namesUesd.indexOf(nickNames[socket.id]);
    delete namesUesd[nameIndex];
    delete nickNames[socket.id];
  })
}