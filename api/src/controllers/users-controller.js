const { Users , Event} = require('../db')
const jwt = require('jsonwebtoken')
const {compare , encrypt} = require('../helpers/handleByCrypt')
const authConfig = require('../config/auth')
const uploadImage = require('../helpers/cloudinary');
const fsExtra = require('fs-extra');

// Ruta Login
const login = async (req, res , next) => {
    const { email, password } = req.body;
	try {
            let userCheck = await Users.findOne({
                where: {
                    email
                },
            });
            
        if (!userCheck) return res.status(400).send('User not found');

        const checkPassword = await compare(password, userCheck.password)

		if (!checkPassword)
			return res.status(400).send('Password does not match!');
		else if (
			userCheck.email !== email
		)
			return res.status(400).send('Username does not match!');
		else {
			const jwtToken = jwt.sign(
				{
					//token creation
					id: userCheck.id,
					email: userCheck.email,
					status: userCheck.status,
				},
				authConfig.secret,
				{ expiresIn: '12h' }
			);
			res.status(200).json({
				token: jwtToken,
				status: userCheck.status,
				id: userCheck.id,
				email: userCheck.email,
				username: userCheck.username,
				profile_picture: userCheck.profile_picture
			});

		}
	} catch (e) {
		next(e);
	}


}

const upDateUser = async (req, res) => {
    const {id} = req.params;
    const {username , email, password , status} = req.body;
    var result;

    try {
        if(!id) res.status(404).json({message: 'id is require...'});

        let user = await Users.findOne({where:{id: id}});
        if(!user) res.status(404).json({message: 'user not found...'});
        
		if(username) await Users.update({username},{where:{id: id}});
		if(email) await Users.update({email},{where:{id: id}});
		if(password) await Users.update({password},{where:{id: id}});
		if(status) await Users.update({status},{where:{id: id}});


        if(req.files?.image){
            result = await uploadImage(req.files.image.tempFilePath);
            await Users.update({profile_picture: result.secure_url},{where:{id: id}});
            await fsExtra.unlink(req.files.image.tempFilePath);
        }

        user = await Users.findOne({where:{id: id}});
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
    }
}
// Ruta Register
const register = async (req, res , next) => {

    const { username , email, password , status } = req.body
    
    try {
        const alreadyExistsMail = await Users.findAll({
			where: { email: email },
		});

		if (alreadyExistsMail.length) {
			console.log('Email already registered');
			res.status(400).send('Email already registered');
			return;
		}
		
		const alreadyExistsUsername = await Users.findAll({
			where: { username: username },
		});

		if (alreadyExistsUsername.length) {
			console.log('Username already registered');
			res.status(400).send('Username already registered');
			return;
		}

		let newPassword = await encrypt(password)

		const newUser = await Users.create({
			email: email,
			password: newPassword,
			username: username,
			status: status,
			profile_picture:
				'https://media.istockphoto.com/vectors/man-reading-book-and-question-marks-vector-id1146072534?k=20&m=1146072534&s=612x612&w=0&h=sMqSGvSjf4rg1IjZD-6iHEJxHDHOw3ior1ZRmc-E1YQ=',
		});
        
		res.json({
			message: 'User created succesfully!',
			id: newUser.id,
			email: newUser.email,
		});
	} catch (err) {
		next(err);
	}

    
}

const getUsers = async (req, res) => {
    const allUsers = await Users.findAll()
    res.json(allUsers)
}


const logout =  (req, res) => {

	try {
	   req.logOut();
		res.clearCookie('session.sig', { path: '/' });
		res.clearCookie('session', { path: '/' });
		res.redirect('/');
		
	} catch (error) {
		console.log(error);
	}
}


module.exports = {
    register,
    login,
    getUsers,
    logout,
	upDateUser
}