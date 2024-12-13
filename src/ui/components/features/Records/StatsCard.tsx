import { Card, CardBody } from '@nextui-org/react'
import React from 'react'

export default function StatsCard({stat}: any) {
    return (
        <Card className="bg-[var(--space-gray)] border-[var(--rebel-yellow)] border">
            <CardBody className="flex flex-row items-center gap-3">
                {stat?.icon || ""}
                <div>
                    <p className="text-sm text-white">{stat?.label || ""}</p>
                    <p className="text-[var(--rebel-yellow)] font-semibold">
                        {stat?.value || ""}
                    </p>
                </div>
            </CardBody>
        </Card>)
}
