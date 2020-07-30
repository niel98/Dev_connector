const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

//@route    POST api/users
//@desc     Register users
//access    Public
router.post('/',
    //validation checks
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid Email')
            .isEmail(),
        check('password', 'Please include a password with a minmum of 6 characters')
            .isLength({ min: 6 })
    ],
    async (req, res) => {

        //error check
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body

        try {
            //see if the user exists
            let user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
            }

            //Get user's avatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            })

            //Encrypt user password
            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt)

            await user.save()

            //Return jsonwebtoken

            res.send('Users Registered')

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }

    })

module.exports = router