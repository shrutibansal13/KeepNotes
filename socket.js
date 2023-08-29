const Notification = require('./models/notification')

module.exports = function (io) {
    io.on("connection",(socket)=>{
        console.log(`User connected:${socket.id}`);
    
        socket.on("sendMessage",async (data)=>{
            
            const config=Notification({
                userId:data.userId,
                notification:data.message
            } )
            const settingNotification = await config.save()
            console.log(settingNotification);
            const getNotification = await Notification.find()
            console.log(getNotification);
            socket.broadcast.emit("receivedMessage", getNotification)
        })
    
        
        socket.on('disconnect', () => {
            console.log('User disconnected');
          });
    })
    
  };
