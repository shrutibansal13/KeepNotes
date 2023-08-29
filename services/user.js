const userModel = require('../models/user')
const Notification = require('../models/notification')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Permission = require('../models/permission');
const OtId = require('mongodb').ObjectId;
var EventEmitter = require('events');
const Labels = require('../models/labels');
var eventEmitter = new EventEmitter();
const Notes = require('../models/notes');
const Archive = require('../models/archive');
const Trash = require('../models/trash');

async function getData() {
    try {
        const data = await userModel.find()
        return data;
    }
    catch (error) {
        return error;
    }
}


async function getAllUser() {
    try {
        const data = await userModel.find({role:true})
        return data;
    }
    catch (error) {
        return error;
    }
}


async function getUserById(id) {
    try {
        const data = await userModel.find({role:true, _id:new OtId(id)})
        return data;
    }
    catch (error) {
        return error;
    }
}


async function insertData(data) {
    try {

        const check = await userModel.find({ email: data.email })
        
        if (check.length>0) {
            return 'User already Exists'
        } else {

            if (data.role === 1) {

                const dbpassword = await bcrypt.hash(data.password, saltRounds = 10)
                const userdetails = userModel({
                    name: data.name,
                    email: data.email,
                    password: dbpassword,
                    role: data.role,
                    pages: data.pages
                })

                const response = await userdetails.save()
                return response;
            } else {
                return 'Superadmin Already Exists'

            }

        }

    }
    catch (error) {
        return error;
    }
}


async function loginuser(data) {
    try {
        const result = await userModel.find({ email: data.email })
        if (result) {
            
            const checkPassword = await bcrypt.compare(data.password, result[0].password)
            if (checkPassword===true) {
                eventEmitter.emit('result',result)
                const jwtSecretKey = process.env.JWT_SECRET_KEY
                const jwtToken = jwt.sign(result[0].toJSON(), jwtSecretKey)
                const roles = result[0].role;
                return { jwtToken, roles, result };
            } else {
                return 'Password does not match';
            }


            
        } else {
            return 'email does not exists';
        }



    }
    catch (error) {
        return `Could not fetch data ${error}`;
    }
}
eventEmitter.on('result', (resultData) => {
    console.log('Yes, it is an old user ');
  });
// eventEmitter.on('login',loginuser)
// eventEmitter.emit('login')



async function updateData(data,id) {
    try {
    
                 const name= data.name
                const results = await userModel.updateOne(
                    {
                         "_id":new OtId(id) 
                    },
                    {
                    $set: {
                        "name":name,
                        "email": data.email,
                        "role":1,
                        "pages":data.pages
                    }
                })
                if(results){
                    return {data, id};
                }
                
    }
    catch (error) {
        return error;
    }
}


async function getPermissions() {
    try {
        const data = await Permission.find()
        return data;
    }
    catch (error) {
        return error;
    }
}


async function getNotifications() {
    try {
        const data = await Notification.find()
        console.log(data,"sdfghjkl");
        return data;
    }
    catch (error) {
        return error;
    }
}


async function getLabelById(id) {
    try {
        const data = await Labels.find({ userId:new OtId(id)})
        return data;
    }
    catch (error) {
        return error;
    }
}

async function insertLabel(data){
    try{
        let config= Labels({
            labels:data.labels,
            userId:data.id
        })
        const response=  await config.save()
        return response;
    }
    catch(error){
        return error;
    }
}


async function getNotes() {
    try {
        const data = await Notes.aggregate([
            {
                $lookup:{
                    from:"labels",
                    localField:"label_id",
                    foreignField:"_id",
                    as: "allData"
                }
               
            },
            {
                $unwind: '$allData'
              },
           { $project:{
                _id:1,
                notes:1,
                label_id:1,
                userId:1,
                labels:'$allData.labels'
            }}
        ])


        console.log(data,"datat");
        //  console.log(data,"datat");
        return data;
    }
    catch (error) {
        return error;
    }
}

async function insertNotes(data){
    try{
        let config= Notes({
            notes:data.notes,
            label_id:data.label_id,
            userId:data.userId
        })
        const response=  await config.save()
        return response;
    }
    catch(error){
        return error;
    }
}

async function getNotesByLabel(data) {
    try {
        
        const response = await Notes.find({"label_id":new OtId(data.label_id),"userId":new OtId(data.userId)})
        return response;
    }
    catch (error) {
        return error;
    }
}

async function getIdByLabel(label) {
    try {
        const data = await Labels.find({"labels":label.labels})
        return data;
    }
    catch (error) {
        return error;
    }
}


async function getLabelName(id) {
    try {
        const data = await Labels.find({ _id:new OtId(id)})
        return data;
    }
    catch (error) {
        return error;
    }
}


async function insertArchives(id){
    try{
        const response = await Notes.find({"_id":new OtId(id)})
        console.log(response[0]);

        let config= Archive({
            notes:response[0].notes,
            userId:response[0].userId,
            label_id:response[0].label_id,
            note_id:response[0]._id
        })
        const result=  await config.save()
        
        return result;
    }
    catch(error){
        return error;
    }
}


async function getArchives() {
    try {
        const data = await Archive.find({})
        return data;
    }
    catch (error) {
        return error;
    }
}



async function deleteArchives(id) {
    try {
        const data = await Archive.deleteOne({"_id":new OtId(id)})
        return data;
    }
    catch (error) {
        return error;
    }
}


async function addTrash(id){
    try{
        const response = await Notes.find({"_id":new OtId(id)})
        console.log(response[0]);

        let config= Trash({
            notes:response[0].notes,
            userId:response[0].userId,
            label_id:response[0].label_id,
            note_id:response[0]._id
        })
        const result=  await config.save()
        
        return result;
    }
    catch(error){
        return error;
    }
}


async function getTrash() {
    try {
        const data = await Trash.find({})
        return data;
    }
    catch (error) {
        return error;
    }
}



async function deleteNotes(id) {
    try {
        const data = await Trash.deleteOne({"_id":new OtId(id)})
        const response = await Notes.deleteOne({"_id":new OtId(id)})


        return data;
    }
    catch (error) {
        return error;
    }
}

async function undoTrash(id) {
    try {
        const data = await Trash.deleteOne({"_id":new OtId(id)})
        return data;
    }
    catch (error) {
        return error;
    }
}

module.exports = {
    getData,
    insertData,
    loginuser,
    getAllUser,
    getUserById,
    updateData,
    getPermissions,
    getNotifications,
    getLabelById,
    insertLabel,
    insertNotes,
    getNotes,
    getNotesByLabel,
    getIdByLabel,
    getLabelName,
    insertArchives,
    getArchives,
    deleteArchives,
    addTrash,
    getTrash,
    deleteNotes,
    undoTrash
}