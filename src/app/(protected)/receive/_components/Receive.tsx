"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ReceiveColumns, ReceiveColumnsType } from "./columns"
import { DataTable } from "@/components/ui/data-table";

interface ReceiveProps {
    data: ReceiveColumnsType[],
    total: number
}

export const Receive = ({ data, total }: ReceiveProps) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Receive Files
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4 p-4">
                <DataTable
                    columns={ReceiveColumns}
                    data={data}
                    totalCount={total}
                />
            </CardContent>
        </Card>
    )
}