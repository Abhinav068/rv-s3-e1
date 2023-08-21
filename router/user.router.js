const { Router } = require('express');
const { UserModel } = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    try {
        res.send({ result: 'all users' })
    } catch (error) {
        console.log(error);
    }
})

userRouter.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body
        const isuser = await UserModel.findOne({ email });
        if (isuser) {
            res.send({ result: 'user already exist' });
            return;
        }
        
        const hash = bcrypt.hashSync(password, +process.env.salt);
        const user = new UserModel({ email, password: hash });
        await user.save();

        res.send({ result: 'user successfully registered' });
    } catch (error) {
        console.log(error);
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const isuser = await UserModel.findOne({ email });
        console.log(isuser);
        if (!isuser) {
            res.send({ result: 'user doesn\'t exist' });
            return;
        }
        else {
            const cred = bcrypt.compareSync(password, isuser.password);
            if (cred) {
                const token = jwt.sign({id:isuser._id,email:isuser.email}, process.env.tokenkey);
                
                res.send({ token })
            }
            else{
                res.send({ result: 'invalid credentials' });
            }

        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = { userRouter };