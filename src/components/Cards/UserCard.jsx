import React from 'react'
import StatCard from './StatCard'
import profile from '../../assets/images/default-profile.jpg'

const UserCard = ({userInfo}) => {
  return (
    <div className='user-card p-2' >
        <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
                <img
                     src={userInfo?.profileImageUrl?.trim() || profile}
                    alt={`Avatar`}
                    className='w-12 h-12 rounded-full border-2 border-white'
                />
                <div>
                    <p className="text-sm font-medium">{userInfo?.name}</p>
                    <p className="text-xs text-gray-500">{userInfo?.email}</p>
                </div>
            </div>
        </div>
        <div className="flex items-end gap-3 mt-5">
            <StatCard
                label='Pending'
                count={userInfo?.pendingTasks || 0}
                status='pending'
            />
             <StatCard
                label='Progress'
                count={userInfo?.inProgressTasks || 0}
                status='in-progress'
            />
             <StatCard
                label='Completed'
                count={userInfo?.completedTasks || 0}
                status='completed'
            />
        </div>
    </div>
  )
}

export default UserCard