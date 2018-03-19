var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    //console.log("heee");
    res.render('index',{user:"Shantanu is king"});
});

module.exports = router;