

const adminLoginCheck = (req, res, next)=>{
    console.log(req.session)
    if(req.session.adminLogIn){
        next();
    }else{
        res.redirect('/admin');
    }
}
export {adminLoginCheck};