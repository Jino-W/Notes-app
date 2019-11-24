const express = require('express')
const router = express.Router() 
const notesController = require('../app/controllers/notesController')
const categoriesController = require('../app/controllers/categoriesController')
const usersController = require('../app/controllers/usersController')
const authenticateUser = require("../app/middlewares/authentication")


router.post('/users/register', usersController.create)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.show)
router.delete('/users/logout', authenticateUser, usersController.destroy)
router.delete('/users/logoutAll', authenticateUser, usersController.destroyAll)

router.get('/notes', authenticateUser, notesController.list)
router.post('/notes', authenticateUser, notesController.create)
router.get('/notes/:id',authenticateUser, notesController.show)
router.delete('/notes/:id', authenticateUser, notesController.destroy)
router.put('/notes/:id', authenticateUser, notesController.update)

router.get('/categories', authenticateUser, categoriesController.list)
router.post('/categories', authenticateUser, categoriesController.create) 
router.get('/categories/:id', authenticateUser, categoriesController.show)
router.put('/categories/:id', authenticateUser, categoriesController.update)
router.delete('/categories/:id', authenticateUser, categoriesController.destroy) 


module.exports = router