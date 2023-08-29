const userService= require('../services/user')
const events = require('events');
const eventEmitter = new events.EventEmitter();

async function getAllNotification(req,res) {
    try{
        console.log('siewdjdjkjdn');
        const data= await userService.getNotifications();
        res.status(200).json({success:'true',data:data})
     }
     catch(err){
         res.status(500).json({success:'false',error:err})
     }
  };

async function getAllData(req, res){
    try{
       const data= await userService.getData();
       res.status(200).json({success:'true',data:data})
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}

async function getAllUser(req, res){
    try{
       const data= await userService.getAllUser();
       res.status(200).json({success:'true',data:data})
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}


async function getUserById(req, res){
    try{

        if(req.query){
            const data= await userService.getUserById(req.query.id);
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}


async function insertUser(req, res){
    try{

        if(req.body){
            const data= await userService.insertData(req.body);
            res.status(201).json({success:'true',data:data})
        }else{
            res.status(204).json({success:'false',message:'Invalid Data'})
        }
      
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}


async function loginuser(req, res){
    try{


        if(req.body){
            const data= await userService.loginuser(req.body);
            
            res.status(200).json({success:'true',data:data})
        }else{
            res.status(200).json({success:'false',message:'Invalid Data'})
        }
      
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}



async function updateData(req, res){
    try{

        if(req.body && req.query){
            
            const data= await userService.updateData(req.body, req.query.id);

            // socket.emit("updatedRoutes",req.body.pages)
            res.status(200).json({success:'true',data:data})
        }else{
            res.status(204).json({success:'false',message:'Invalid Data'})
        }
      
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}


async function getAllPermissions(req, res){
    try{
       const data= await userService.getPermissions();
       res.status(200).json({success:'true',data:data})
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}


async function insertLabel(req, res){
    try{

        if(req.body){
            const data= await userService.insertLabel(req.body);
            res.status(201).json({success:'true',data:data})
        }else{
            res.status(204).json({success:'false',message:'Invalid Data'})
        }
      
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}

async function getLabels(req, res){
    try{

        if(req.query){
            const data= await userService.getLabelById(req.query.id);
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}


async function insertNotes(req, res){
    try{

        if(req.body){
            const data= await userService.insertNotes(req.body);
            res.status(201).json({success:'true',data:data})
        }else{
            res.status(204).json({success:'false',message:'Invalid Data'})
        }
      
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}

async function getNotes(req, res){
    try{

        if(req.query){
            const data= await userService.getNotes();
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}

async function getLabelNotes(req, res){
    try{

        if(req.query){
            const data= await userService.getNotesByLabel(req.query);
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}

async function getIdByLabel(req, res){
    try{

        if(req.query){
            console.log(req.query,'jk')
            const data= await userService.getIdByLabel(req.query);
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}

async function getLabelName(req, res){
    try{

        if(req.query){
            const data= await userService.getLabelName(req.query);
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}


async function insertArchives(req, res){
    try{

        if(req.body){
            const data= await userService.insertArchives(req.query);
            res.status(201).json({success:'true',data:data})
        }else{
            res.status(204).json({success:'false',message:'Invalid Data'})
        }
      
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}


async function getArchive(req, res){
    try{

        if(req.query){
            const data= await userService.getArchives();
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}

async function deleteArchives(req, res){
    try{

        if(req.query){
            const data= await userService.deleteArchives(req.query);
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}



async function addTrash(req, res){
    try{

        if(req.body){
            const data= await userService.addTrash(req.query);
            res.status(201).json({success:'true',data:data})
        }else{
            res.status(204).json({success:'false',message:'Invalid Data'})
        }
      
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}


async function getTrash(req, res){
    try{

        if(req.query){
            const data= await userService.getTrash();
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}

async function deleteNotes(req, res){
    try{

        if(req.query){
            const data= await userService.deleteNotes(req.query);
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}

async function undoTrash(req, res){
    try{

        if(req.query){
            const data= await userService.undoTrash(req.query);
             res.status(200).json({success:'true',data:data})
        }else{
            res.status(404).json({success:'false',message:'Id not found'})
        }
       
    }
    catch(err){
        res.status(500).json({success:'false',error:err})
    }
}
module.exports={
    getAllData,
    insertUser,
    loginuser,
    getAllUser,
    getUserById,
    updateData,
    getAllPermissions,
    getAllNotification,
    getLabels,
    insertLabel,
    getNotes,
    insertNotes,
    getLabelNotes,
    getIdByLabel,
    getLabelName,
    insertArchives,
    getArchive,
    deleteArchives,
    addTrash,
    getTrash,
    deleteNotes,
    undoTrash
}

