let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongoUrl = "mongodb://localhost:27017"
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoUrl = "mongodb+srv://test:test123@cluster0.8vlxh.mongodb.net/imdb?retryWrites=true&w=majority"
const dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT || 8210;
var db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

//GET
app.get('/', (req, res)=>
{
    res.send("Welcome to express");
})

/*app.get('/category', (req, res)=>
{
    db.collection('category').find().toArray((err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/movies', (req, res)=>
{
    db.collection('movies').find().toArray((err,result)=> {
        if (err) throw err;
        res.send(result)
    })
})*/

//language
/*app.get('/movies/:language', (req, res)=>
{
    let lang = req.params.language;
    console.log(">>>>>>language", lang)
    db.collection('movies').find({language:lang}).toArray((err,result)=>
    {
        if (err) throw err;
        res.send(result)
    })
})
*/
//queryParam

/*app.get('/category', (req, res)=>
{
    let c_id = Number(req.query.id)
    console.log(">>>>>category",c_id)
    db.collection('category').find({id:c_id}).toArray((err,result)=>
    {
        if (err) throw err;
        res.send(result)
    })
})*/


//genre
app.get('/category', (req, res)=>
{
    let genre = req.query.name
    //to get particular genre instead of everything
    let query = {};
    if(genre)
    {
        query = {name:genre}
    }
    console.log(">>>>>genre",genre)
    db.collection('category').find(query).toArray((err,result)=>
    {
        if (err) throw err;
        res.send(result)
    })
})

//to get name and genre

app.get('/movies',(req, res)=>
{
    let gen = req.query.genre;
    let lan = req.query.language;
    let query = {};
    if(gen && lan )
    {
        query = {genre:gen, language:lan}
    }
    else if(gen) 
    {
        query = {genre:gen}
    }
    else if(lan)
    {
        query = {language:lan}
    }
    console.log("genre>>>>>",gen)
    db.collection('movies').find(query).toArray((err,result)=>
    {
        if(err) throw err
        res.send(result)
    })
})


app.get('/details/:id', (req, res)=> {
    let mov_id = Number(req.params.id)
    //let mov_id = mongo.ObjectId(req.params.id)
    //db.collection('movies').find({_id:mov_id}).toArray((err,result)=> {
    db.collection('movies').find({id:mov_id}).toArray((err,result)=> {
        if(err) throw err;
        res.send(result)
    })
})

//details of movies
app.get('/info/:id', (req, res)=> {
    let cat_id = req.params.id
    //let mov_id = mongo.ObjectId(req.params.id)
    //db.collection('movies').find({_id:mov_id}).toArray((err,result)=> {
    db.collection('mov_details').find({category_id:cat_id}).toArray((err,result)=> {
        if(err) throw err;
        res.send(result)
    })
})

MongoClient.connect(mongoUrl,(err,connection)=>
{
    if(err) console.log(`Error while connecting`);
    db = connection.db('imdb');
    app.listen(port, (req,res) => {
        console.log(`listening on port no.${port}`)
    })
})