var express = require('express');
var monk=require('monk');
var router = express.Router();
var db=monk("localhost:27017/signups");
var collection=db.get("namesandpasswords");
var qrcode=require('qrcode');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.post("/signup",function(req,res){
	
	collection.findOne({"uname":req.body.username},function(err,docs){
		if (docs) {
			res.render("index",{t:req.body.username + " is already taken"})
		}
		else if(!docs){
			if(req.body.pword==req.body.password)
			{
				collection.insert({"uname":req.body.username,"pw":req.body.password},function(err,docs){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render('index',{t:req.body.username + " account successfully created"})
		}
	})
			}
			else
			{
				res.render("index",{t:"password is not matched"})
			}
		}
		else
		{
			console.log(err);
		}
	})
})
router.post("/login",function(req,res){
	collection.findOne({"uname":req.body.user,"pw":req.body.pass},function(err,docs){
		if (docs) {
			
			res.render("home",{name:req.body.user});
		}
		else if(!docs){
			res.render("index",{s:"invalid password and username",code:url})
		}
		else
		{
			console.log(err);
		}
	})
	})
module.exports = router;