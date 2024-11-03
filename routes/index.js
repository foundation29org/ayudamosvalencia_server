// file that contains the routes of the api
'use strict'

const express = require('express')
const needsCtrl = require('../controllers/needs')

const userCtrl = require('../controllers/all/user')
const langCtrl = require('../controllers/all/lang')

const admninUsersCtrl = require('../controllers/admin/users')

const auth = require('../middlewares/auth')
const roles = require('../middlewares/roles')
const api = express.Router()
const cors = require('cors')
const config = require('../config')

const whitelist = config.allowedOrigins;


function corsWithOptions(req, res, next) {
  const corsOptions = {
    origin: function (origin, callback) {
      console.log(origin);
      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  cors(corsOptions)(req, res, next);
}

// user routes, using the controller user, this controller has methods
//routes for login-logout

api.post('/needs', needsCtrl.createNeed)
api.get('/needs', corsWithOptions, auth(roles.AdminSuperAdmin), needsCtrl.getAllNeedsForHeatmap)
api.get('/needs/complete', corsWithOptions, auth(roles.AdminSuperAdmin), needsCtrl.getAllNeedsComplete)
api.delete('/needs/:needId', corsWithOptions, auth(roles.AdminSuperAdmin), needsCtrl.deleteNeed)
//update status
api.put('/needs/status/:needId', corsWithOptions, auth(roles.AdminSuperAdmin), needsCtrl.updateStatus)

api.post('/login', corsWithOptions, userCtrl.login)
api.post('/checkLogin', corsWithOptions, userCtrl.checkLogin)

api.post('/signup', corsWithOptions, userCtrl.signUp)

api.post('/activateuser/:userId', corsWithOptions, auth(roles.SuperAdmin), userCtrl.activateUser)
api.post('/deactivateuser/:userId', corsWithOptions, auth(roles.SuperAdmin), userCtrl.deactivateUser)

// lang routes, using the controller lang, this controller has methods
api.get('/langs/', langCtrl.getLangs)


api.get('/admin/allusers', corsWithOptions, auth(roles.AdminSuperAdmin), admninUsersCtrl.getAllUsers)

/*api.get('/testToken', auth, (req, res) => {
	res.status(200).send(true)
})*/
//ruta privada
api.get('/private', auth(roles.AllLessResearcher), (req, res) => {
	res.status(200).send({ message: 'You have access' })
})

module.exports = api
