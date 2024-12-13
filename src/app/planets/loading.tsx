import DashboardLayout from '@/layouts/DashboardLayout'
import LoadingScreen from '@/ui/components/common/LoadingScreen'
import React from 'react'

export default function loading() {
  return (
    <DashboardLayout>
      <div className="h-full w-full">
          <LoadingScreen />
      </div>
    </DashboardLayout>
  )
}
