



const userModal = require('../modals/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwt_secret = process.env.SECRET;
const loginUser = (req,res)=>{
    const {email,password} = req.body;

    userModal.findOne({email}).then((result)=>{
        if(result){
            const hashedPwd = result.password;
            bcrypt.compare(password, hashedPwd, function (err, isMatch) {
                if (isMatch) {
                  console.log("hashed password is", hashedPwd);
                  console.log("normal password is", password);
            
                  console.log(hashedPwd);
                  console.log("loggin in  the user");
                 
                  const token = jwt.sign(
                    {_id : result._id},
                    jwt_secret,
                    {expiresIn : "3y"}
                  )

                  res.status(200).json({...result , token});

                } else {
                  console.log(
                    "hashed pwd",
                    hashedPwd + "is not the encryption of",
                    password
                  );
                  res.status(400).json({error : 'some error while matching the passwords'});
                }
              });
        }else{
            res.status(404).json({error : 'No such user exists !!'})
        }
    }).catch((err)=>{
      console.log('somer error finding the user');
      res.status(404).json(err);
    })
    // to compare the passwords 


    
}

module.exports = loginUser;