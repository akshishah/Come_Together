const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comment = require('./comment')
const postSchema = new Schema({
   
    description: {
        type: String,
        required: [true, 'Post description required']

    },
    state: {
        type: String,
        required: [true, 'State required']
    },
    
    author: {
        type:String,
        required:[true, 'Name cannot be empty']
    },

    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;