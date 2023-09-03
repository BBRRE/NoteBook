const express = require('express')
const Datastore = require('nedb')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()

app.use(express.json())

const database = new Datastore('database.db');
database.loadDatabase()


app.post('/', (req,res)=>{
    const data = req.body
    database.insert(data)
    res.json({
        status:'sucesss',
        object:req.body
    })
})

app.get('/lol', (req,res) => {
    database.find({},(err,data) => {
        if(err){
            res.end()
            return
        }
        console.log(data)
        res.json(data)
    })
})


app.post('/images', fileUpload({createParentPath: true}), (req,res) => {
    const files = req.files['user-file']
    console.log(files)

    const filePath = path.join(__dirname,'images',files.name)
    console.log(filePath)
    files.mv(filePath, (err) => {
        if(err) return res.status(500).json({status: 'error', messege: err})
    })
    
    
    return res.json(req.files['user-file'])
})



app.use(express.static(path.join(__dirname, 'docs')))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


// app.get('/images', (req,res) => {
//     data = req
//     console.log(data)
//     return res
// })
