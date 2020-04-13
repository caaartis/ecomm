const fs=require('fs');
const crypto=require('crypto');
const util=require('util');
const scrypt=util.promisify(crypto.scrypt);
const Repository=require('./repository')


class UsersRepository extends Repository{

    async comparedPasswords(saved,supplied){
        //Saved =>Password saved in our database . 'hashed.salt'
        //supplied -> password given to us by a user trying to sign in

        // const result= saved.split('.');
        // const hashed=result[0];
        // const salt=result[1];
        const [hashed,salt]=saved.split('.');
        const hashedSuppliedBuf=await scrypt(supplied,salt,64);
        return hashed==hashedSuppliedBuf.toString('hex');
    }

    async create(attrs){
        //attrs==={email :aaa@aaagmail.com}



        attrs.id=this.randomId();
        const salt=crypto.randomBytes(8).toString('hex');
        const buf=await scrypt(attrs.password,salt,64);

        const records=await this.getAll();
         const record={
             ...attrs,
             password:`${buf.toString('hex')}.${salt}`
         };
         records.push(record);
        await this.writeAll(records);
        return record;

    }
}


// const test=async()=>{
// const repo=new UsersRepository('users.json');
// // await repo.create({email:'test@test.com',password:'password'});
// // const users=await repo.getAll();
// // const user=await repo.getOne('d3b9a99f')
// // const user=await repo.getOne('d3b9a99fasfaf')

// // await repo.getAll();
// // await repo.delete('97b9d6af');
// // await repo.delete('783078c9');
// // await repo.delete('07043af0');
// // await repo.update('43d96168',{ password:'mypassword'});
// //test to see if password exist using garbasg id
// // await repo.update('1000010001s0',{ password:'mypassword'});
// // const user=await repo.getOneBy({email:'test@test.com',password:'mypassword',id:'02443493'});
// const user=await repo.getOneBy({saafkjskfajklasfjkjlksf:123});



//  console.log(user)

// };

module.exports= new UsersRepository('users.json');

// //ANOTHER FILE....

// const UsersRepository=require('./users');
// const repo=new UsersRepository('users.json');
// //YEY ANOTHER FILE


// const UsersRepository=require('./users');
// const repo=new UsersRepository('user.json');


// test();