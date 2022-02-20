// Home here an exported function of controller
module.exports.home = function(req,res){

    // console.log(req.cookies); // Printing the cookies

    // Changing the val of cookie we have to edit in res 
    // res.cookie('user_id',25);

    return res.render('home',{
        title:'Codial Home'
    });
}