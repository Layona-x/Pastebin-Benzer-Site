const mongoose = require('mongoose')
const Schema = mongoose.Schema

const textSchema = new Schema({
  text:{
    type:String,
    require:true,
  },
  title:{
    type:String,
    require:true,
  },
  token:{
    type:String,
    require:true,
  }
})

const text = mongoose.model("Text",textSchema)
module.exports = text;