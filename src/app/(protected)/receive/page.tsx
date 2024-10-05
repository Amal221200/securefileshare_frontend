import { receiveFileList } from '@/actions/fileHandler';
import React from 'react'
import { Receive } from './_components/Receive';

const ReceivePage = async ({ searchParams }: {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}) => {
    const fileData = await receiveFileList({
        page: Number(searchParams.page) || 1,
        limit: Number(searchParams.limit) || 10,
    });

    return (
        <div className='p-4'>
            <Receive data={fileData.files} total={fileData.results} />
        </div>
    )
}

export default ReceivePage