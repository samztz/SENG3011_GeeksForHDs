import User from '@models/users.model';


const signUp = async (req, res) => {
  return res.status(200).json({message: 'user have signed up'})  
};


const signIn = async (req, res) => {
  return res.status(200).json({message: 'user have signed in'})  
};