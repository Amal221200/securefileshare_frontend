import React from 'react'
import Profile from './_components/Profile'
import { getMe } from '@/actions/profileHandler'

const ProfilePage = async () => {
  const userData = await getMe()
  
  return (
    <div className='p-4'>
      <Profile userData={userData.data.user} />
    </div>
  )
}

export default ProfilePage