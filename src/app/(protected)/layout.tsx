import React, { PropsWithChildren } from 'react'

const ProtectedLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className='h-screen w-full'>
            {children}
        </div>
    )
}

export default ProtectedLayout