let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const todoSchema = new Schema({
    name:{
        type: String,
        required: [true,"No todo tasks"]
    },
    user:{
        type: Schema.Types.ObjectId, ref: 'User',
        required: [true,"User id is not defined"]
    },
    createDate: {type: Date},
    completeDate: {type: Date, default: null},
    isCompleted: {type: Boolean, default: false}
},{ collection: 'todo' });


module.exports = mongoose.model('Todo', todoSchema);