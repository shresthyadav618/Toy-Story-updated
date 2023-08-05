

const userModal = require('../modals/user');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET;
const bcrypt = require('bcryptjs');
const updatePass = (req,res)=>{

const {prev_pwd,password,cpwd,token} = req.body;
const decoded = jwt.verify(token , jwt_secret)
userModal.findById(decoded._id).then((result)=>{
const hashed_pwd = result.password;

bcrypt.compare(prev_pwd, hashed_pwd, function (err, isMatch) {
    if (isMatch) {
      console.log("hashed password is", hashed_pwd);
      console.log("normal password is", prev_pwd);

      console.log(hashed_pwd);
      console.log("the passwords are the same");
     
var newHashedPwd ;

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
          newHashedPwd = hash;
          console.log("the hashed password is : ", newHashedPwd);
          
          result.updateOne({
            password : newHashedPwd
          }).then((result)=>{
            console.log('updated the user password',newHashedPwd);
            res.status(200).json(result)
          }).catch((err)=>{
            res.status(404).json({error : 'some error updating the new user pwd',err});
          })
          
        }
      });
    }
  });



      

    } else {
      console.log(
        "hashed pwd",
        hashedPwd + "is not the encryption of",
        password
      );
      res.status(400).json({error : 'user previous password entered is inncorrect',err});
    }
  });

})

}

module.exports = updatePass;