"use client";
import React from 'react'
import { UploadColumns, UploadColumnsType } from './columns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '@/components/ui/data-table';

interface UploadProps {
    data: UploadColumnsType[],
    total: number
}

const Upload = ({ data, total }: UploadProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Files</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className='space-y-4 p-4'>
                <div className='flex items-end justify-end'>
                    <Button asChild>
                        <Link href="/upload/new">Share File</Link>
                    </Button>
                </div>
                <DataTable columns={UploadColumns} data={data} totalCount={total} />
            </CardContent>
        </Card>
    )
}

export default Upload