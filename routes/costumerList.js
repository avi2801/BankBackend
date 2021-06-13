const router = require('express').Router();

const costumerList = require('../models/constumer.model')

const transaction = require('../models/transfer.model')

router.route('/').get((req, res) => {
	costumerList.find()
		.then((costumer) => res.json(costumer))
		.catch(err => res.status(400).json('Error' + err))

})

router.route('/transactionget').get((req, res) => {
	transaction.find()
		.then((table) => res.json(table))
		.catch(err => res.status(400).json('Error' + err))
})

router.route('/about:id').get( async(req,res)=>{
await costumerList.findOne({ id: req.params.id })
.then((user)=>res.json(user))
.catch(err=>res.status(400).json('Error'+err))


})

router.route('/add').post((req, res) => {

	const id = req.body.id
	const name = req.body.name
	const last = req.body.last
	const email = req.body.email
	const balance = req.body.balance
	const newCostumer = new costumerList({

		id,
		name,
		last,
		email,
		balance

	})
	newCostumer.save()
		.then(() => res.json("costumer added"))
		.catch((err) => res.json(err))
})

router.route('/transaction').post((req, res) => {
	const name1 = req.body.name1
	const name2 = req.body.name2
	const balance = req.body.balance

	const trans = new transaction({
		name1, name2, balance
	})
	trans.save()
		.then(() => res.json("transaction added"))
		.catch((err) => res.json(err))

})

router.route('/transaction:id').put(async (req, res, next) => {
	console.log(req.params.id)

	const user1 = await costumerList.findOne({ id: req.params.id });
	var balance1 = user1.balance - req.body.balance
	const user2 = await costumerList.findOne({ id: req.body.id2 })
	var balance2 = user2.balance + parseInt(req.body.balance, 10)
	console.log(req.body)
	user1.balance = balance1
	user2.balance = balance2
	await user1.save()
	await user2.save()
	const response = new Object()
	response.code = 1
	response.message = "Transaction successful"
	res.status(200)
	res.send(response)

})


	// costumerList.findOneAndUpdate({ id: req.params.id }, {
	// 	$set: {
	// 		balance: balance1
	// 	}
	// })

	// .then(result => { res.status(200).json({ result }) })
	// .catch(err => { res.status(500).json({ err }) })

	// costumerList.findOneAndUpdate({ id: req.body.id2 }, {
	// 	$set: {
	// 		balance: balance2
	// 	}
	// })
	// .then(result => { res.status(200).json({ result }) })
	// .catch(err => { res.status(500).json({ err }) })








module.exports = router;
