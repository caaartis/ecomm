const express=require('express');
const bodyParser=require('body-parser');
const authRouter=require('./routes/admin/auth');
const cookieSession=require('cookie-session');
const productsRouter=require('./routes/admin/products');
const app=express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
    keys:['kalsdkfkfajfdklsafjldafl']
})


);

app.use(authRouter);
app.use(productsRouter);
app.listen(3002,()=>{
    console.group("dsaaa");
})

