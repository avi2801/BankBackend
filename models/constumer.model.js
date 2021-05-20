const mongoose=require('mongoose');

const Schema=mongoose.Schema

const costumerListSchema= new Schema({
	id:{type:Number,required:true,unique:true},
	name:{type:String,required:true},
	last:{type:String,required:true},
	email:{type:String,required:true},
	balance:{type:Number,required:true}
})

const costumerList=mongoose.model('costumerList',costumerListSchema)

module.exports=costumerList;
