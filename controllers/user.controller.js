const { signupService, findUserByEmail } = require("../services/user.service");
const { generateToken } = require("../utils/token");


exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body)

        res.status(200).json({
            status: 'success',
            message: 'Successfully signed up'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error,
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: 'fail',
                error: 'Please provide your credentials'
            })
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                error: 'No user found. Please create an account.'
            })
        }

        const isPasswordValid = user.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                status: 'fail',
                error: 'Email or Password is not valid'
            })
        }

        const token = generateToken(user);

        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: 'success',
            message: 'Successfully logged in',
            data: {
                user: others,
                token
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error,
        })
    }
}

exports.getMe = async (req, res) => {
    try {
        const user = await findUserByEmail(req.user?.email)
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error,
        })
    }
}