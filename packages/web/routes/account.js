/**
 * Example account management routes
 **/
'use strict'

module.exports = (expressApp, functions) => {

  if (expressApp === null) {
    throw new Error('expressApp option must be an express server instance')
  }

  // Expose a route to return user profile if logged in with a session
  expressApp.get('/account/user', (req, res) => {
    if (req.user) {
      functions.find({id: req.user.id})
      .then(user => {
        if (!user) return res.status(500).json({error: 'Unable to fetch profile'})
        res.json({
          name: user.name,
          email: user.email
        })
      })
      .catch(err => {
        return res.status(500).json({error: 'Unable to fetch profile'})        
      })
    } else {
      return res.status(403).json({error: 'Must be signed in to get profile'})
    }
  })
  
  // Expose a route to allow users to update their profiles (name, email)
  expressApp.post('/account/user', (req, res) => {
    if (req.user) {
      functions.find({id: req.user.id})
      .then(user => {
        if (!user) return res.status(500).json({error: 'Unable to fetch profile'})

        if (req.body.name)
          user.name = req.body.name

        return functions.update(user)
      })
      .then(user => {
        return res.status(204).redirect('/account')
      })
      .catch(err => {
        return res.status(500).json({error: 'Unable to fetch profile'})        
      })
    } else {
      return res.status(403).json({error: 'Must be signed in to update profile'})
    }
  })
}
