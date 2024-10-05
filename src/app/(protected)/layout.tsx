import { PropsWithChildren } from 'react'
import { Header } from './_components/Header'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ProtectedLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className='h-screen w-full'>
            <Header />
            {children}
        </div>
    )
}

export default ProtectedLayout