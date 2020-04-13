//add in a route handler
const express=require('express');
const {check,validationResult }=require('express-validator');



const usersRepo=require('../../repositories/users');

const signupTemplate=require('../../views/admin/auth/signup');
const signinTemplate=require('../../views/admin/auth/signin');
const {requireEmail,requirePassword,requirePasswordConfirmation,requireEmailExists,requiresPasswordForUser}=require('./validators');

const router=express.Router();
router.get('/signup',(req,res)=>{
    res.send(signupTemplate({req}));
});




router.post('/signup',[requireEmail,requirePassword,requirePasswordConfirmation
]
,async (req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.send(signupTemplate({req,errors}))
    }
    //get access to email, password , password Confirmation
    //on function is same as addEventListener

    const {email,password,passwordConfirmation}=req.body;

    // const existingUser=await usersRepo.getOneBy({email});
    // if(existingUser){
    //     return res.send('Email in use');
    // }



    //create a user in our user repo to represent  this persosn

  const user=  await usersRepo.create({email, password})

    //store the id of that user inside the users cookie

    req.session.userId=user.id; //added by cookie session

    res.send('Account Created!!')
}


)
router.get('/signout',(req,res)=>{

    req.session=null;
    res.send('you are logged out')

});

router.get('/signin',(req,res)=>{
    res.send(signinTemplate({}));


})


router.post('/signin',[requireEmailExists,requiresPasswordForUser],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.send(signinTemplate({errors}));
    }
 const {email}=req.body;

 const user=await usersRepo.getOneBy({email});




 req.session.userId=user.id;

 res.send('you are signeed in!!!!')
});


module.exports=router;