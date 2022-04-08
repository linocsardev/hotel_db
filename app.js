const express = require('express');
const morgan = require('morgan');
const pkg = require('./package.json')

const roomsRoutes = require('./src/routes/rooms.routes');
const userRoutes = require('./src/routes/user.routes')
const authRoutes = require('./src/routes/auth.routes')
const app = express()



app.set('pkg', pkg)
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        autor: app.get('pkg').author,
        description: "",
    })
})
app.use('/api/rooms', roomsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)




module.exports = app;