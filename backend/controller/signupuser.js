
const userModal = require('../modals/user');
const bcrypt = require('bcryptjs');
const signUpUser = (req,res)=>{
const {name,email,password,image} = req.body;
// console.log(req.body);
var hashedPwd ;

bcrypt.genSalt(10, function (err, Salt) {
    if (err) {
      console.log("there was some error in encrypting the password", err);
      res.status(404).json(err);
    } else {
      bcrypt.hash(password, Salt, function (err, hash) {
        if (err) {
          console.log("cannot encrypt , there was some error", err);
          res.status(404).json(err);
        } else {
          hashedPwd = hash;
          console.log("the hashed password is : ", hashedPwd);
          userModal.findOne({name,email}).then((result)=>{
            console.log('the result was  : ',result);
            if(result){
                res.status(404).json({error : 'User Already Exists!!'});
            }else{
                const user = userModal({
                    name : name,
                    email : email ,
                    password : hashedPwd,
                    image : image
                    });
                    
                    user.save().then((result)=>{
                        res.status(200).json(result);
                    }).catch((err)=>{
                        console.log('there was some error while signing the user',err);
                        res.status(400).json({error : err});
                    })
            }
          })
         
          
        }
      });
    }
  });




}

module.exports = signUpUser;


// to compare the passwords 
// bcrypt.compare(pwd, hashedPwd, function (err, isMatch) {
//     if (isMatch) {
//       console.log("hashed password is", hashedPwd);
//       console.log("normal password is", pwd);

//       console.log(hashedPwd);
//       console.log("creating the user");
//       const newUser = userModel({
//         email: userEmail,
//         name: userName,
//         pwd: hashedPwd,
//         image : image
//       });
//       newUser.save().then((result) => {
//         // console.log("new user is added", result);
//         res.status(200).json(result);
//       });
//     } else {
//       console.log(
//         "hashed pwd",
//         hashedPwd + "is not the encryption of",
//         pwd
//       );
//       res.status(400).send('some error while matching the passwords');
//     }
//   });