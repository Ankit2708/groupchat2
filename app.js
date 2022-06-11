const express=require('express')
const cors=require('cors')
const userRoutes=require('./backend/routes/user')

const app=express()
const sequelize=require('./backend/util/database')
const User=require('./backend/models/user')
app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use('/',(req,res)=>{
    console.log('working')
})
sequelize.sync({force:true})
.then(()=>{
    console.log('database is connected')
}).catch(err=>console.log(err))
app.listen(3000)
