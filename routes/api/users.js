const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

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
    (req, res) => {

        //error check
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        res.send('Users Route')
    })

module.exports = router