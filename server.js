const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose');
require('dotenv').config();

const app=express();

const port=process.env.PORT|| 5000;
app.use(cors());
app.use(express.json());

const url=`mongodb+srv://Avinash:avinash@123@cluster0.bhayj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.set('useFindAndModify', false);

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database.0\n${err}`);
    })


const constumerList=require('./routes/costumerList');

app.use('/constumerList',constumerList);

app.listen(port,()=>{
	console.log("server is listening")

})

