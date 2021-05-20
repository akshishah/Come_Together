const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const Post = require('./models/post');
const Comment = require('./models/comment');
mongoose.connect('mongodb://localhost:27017/comeTogether', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("We're Connected to Mongo!!!");
    })
    .catch(err => {
        console.log("Ohh some error occured on Mongo connection");
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : true}));



const states = ["Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"]



app.get('/', (req, res) => {
    res.send('Home Page!!')
})

//All posts
app.get('/posts',async(req,res) =>{
    const posts = await Post.find({});
    res.render('posts/index', {posts} );
})

// new post
app.get('/posts/new',(req,res) =>{
    res.render('posts/new',{states});
})
app.post('/posts',async(req,res) =>{
    const post = new Post(req.body);
    await post.save();
    console.log(post);
    res.redirect('/posts');
})

app.get('/posts/:id',async(req,res) =>{
    const {id} = req.params;
    const post  = await Post.findById(id).populate('comments');
    if(post){
        
        res.render('posts/show' , {post});   
    }
    else{
        res.send('Invalid Id');
    }   
})

app.get('/posts/:id/comments/new',(req,res) =>{
    const {id} = req.params;
    res.render('comments/new',{id});
})

app.post('/posts/:id/comments',async (req,res) =>{
    const {id} = req.params;
    const post = await Post.findById(id);
    const comment = new Comment(req.body);
    post.comments.push(comment);
    comment.posts = post;
    await post.save();
    await comment.save();
    res.redirect(`/posts/${id}`);
})

app.listen(3000, () => {
    console.log('App listening on 3000');
})