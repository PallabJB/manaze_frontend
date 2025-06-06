import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import {useNavigate} from 'react-router-dom'
import profile from '../../assets/images/default-profile.jpg'

const SideMenu = ({activeMenu}) => {
    const { user, clearUser } = useContext(UserContext);
    const [ sideMenuData, setSideMenuData ] = useState([]);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if(route === 'logout'){
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    };

    useEffect(() => {
        if(user){
            setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
        }
        return () => {};
    }, [user]);


  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
        <div className="flex flex-col items-center justify-center mb-7 pt-5">
            <div className="relative">
                <img src={user?.profileImageUrl || profile} alt="Profile Image" className="w-20 h-20 bg-slate-500 rounded-full object-cover" />
            </div>
            {user?.role === 'admin' && (
                <div className="text-[10px] font-medium text-white bg-purple-500 px-3 py-0.5 rounded mt-1">
                    Admin
                </div>
            )}
            <h5 className="text-gray-950 font-medium leading-6 mt-5">
                {user?.name || ''}
            </h5>
            <p className="text-[12px] text-gray-500">{user?.email || ''}</p>
        </div>
        {sideMenuData.map((item, index) => (
            <button

                //key={`menu_${index}`}
                key={item.label}

               className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-all duration-100 ${
  activeMenu === item.label
    ? "text-red-500 bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-4 border-red-500"
    : "hover:bg-red-300 text-gray-700"
}`}

                onClick={() => handleClick(item.path)}
            >
                <item.icon className='text-xl'/>
                {item.label}
            </button>
        ))}
    </div>
  )
}

export default SideMenu