const multer = require('multer')
const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const acceptedFiles = [ 'png', 'jpg' ]

app.set('view engine', 'ejs')
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination (req, file, cb){
        cb(null, 'uploads/')
    },
    filename (req, file, cb){
        const dateName = Date.now() 
        req.filename = dateName

        cb(null, dateName + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', upload.single('upImg') , (req, res) => {
    res.status(200)
    res.redirect(`/${req.filename}`)
})

app.get('/:imgName', (req, res) => {
    const allFiles = fs.readdirSync('./uploads')
    const file = allFiles.find(file => file.replace(path.extname(file), '') === req.params.imgName)

    if(!file) return res.statusCode(404)

    res.sendFile(`./uploads/${file}`, { root: path.join(__dirname) })
})


app.listen(PORT, () => console.log('Online'))