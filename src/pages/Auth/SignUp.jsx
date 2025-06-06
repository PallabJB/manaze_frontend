import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';
import Input from '../../components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminInviteToken, setAdminInviteToken] = useState('');

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

   //HANDLE SIGNUP FROM SUBMIT
    const handleSignUp = async (e) => {
      e.preventDefault();

      let profileImageUrl = '';
  
      if(!fullName){
        setError('Please enter full name');
        return;
      }
      if(!validateEmail(email)){
        setError('Please enter a valid email address');
        return;
      }
      if(!password){
        setError('Please enter your password');
        return;
      }
      setError('');
  
      //SIGNUP API CALL 
      try{

        // If a profile picture is selected, upload it and get the URL
        if(profilePic){
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || ''; // Assuming the response contains the image URL
        }
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
          name: fullName,
          email,
          password,
          profileImageUrl,
          adminInviteToken,
        });
        const {token, role} = response.data;

        if(token){
          localStorage.setItem('token', token);
          updateUser(response.data);
          //REDIRECT BASED ON ROLE
          if(role === 'admin'){
            navigate('/admin/dashboard');
          }else{
            navigate('/user/dashboard');
          }
        }
      }catch(error){

      }
    };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:m-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[10px] mb-6">
          Join us today by enering your defails below.
        </p>
        <form onSubmit={handleSignUp} >
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={({target}) => setFullName(target.value)}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"            
            />
             <Input
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label="Email Address"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="Minimum 8 characters"
          type="password"         
        />
        <Input
          value={adminInviteToken}
          onChange={({target}) => setAdminInviteToken(target.value)}
          label="Admin Invite Token"
          placeholder="6 digit code"
          type="text"         
        />
         </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button type='submit' className='btn-primary'>
          SignUp
        </button>
        <p className="text-[13px] text-slate-800 mt-3">
          Already have an account?{' '}
          <Link className='font-medium text-green-600 underline' to='/login' >
            Login
          </Link>
        </p>
         
        </form>
      </div>

    </AuthLayout>
  )
}

export default SignUp