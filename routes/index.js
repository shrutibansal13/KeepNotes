const express = require("express");
const router= express.Router();
const userController = require('../controllers/userController')


router.get('/',userController.getAllData)
router.get('/getalluser',userController.getAllUser)
router.get('/getuserbyId',userController.getUserById)
router.post('/login',userController.loginuser)
router.post('/insertuser',userController.insertUser)
router.post('/updateuser',userController.updateData)


router.get('/getpermissions',userController.getAllPermissions)
router.get('/getnotifications',userController.getAllNotification)


router.get('/getlabels',userController.getLabels)
router.get('/getIdByLabel',userController.getIdByLabel)
router.post('/insertlabel',userController.insertLabel)


router.get('/getnotes',userController.getNotes)
router.get('/getnotesbylabel',userController.getLabelNotes)
router.get('/getLabelname',userController.getLabelName)
router.post('/insertnotes',userController.insertNotes)



router.post('/insertarchives',userController.insertArchives)
router.get('/getarchive',userController.getArchive)
router.delete('/deletearchives',userController.deleteArchives)



router.post('/addtrash',userController.addTrash)
router.get('/gettrash',userController.getTrash)
router.delete('/deleteundo',userController.undoTrash)
router.delete('/deletenotes',userController.deleteNotes)
module.exports= router;
