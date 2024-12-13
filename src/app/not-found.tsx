"use client"
import DashboardLayout from '@/layouts/DashboardLayout'
import ErrorPage from '@/ui/components/common/Error/ErrorPage'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <DashboardLayout>
        <ErrorPage title='404' btnText={"Back to Homepage"} text1={"Something's missing."} text2={"Sorry, we can't find that page. You'll find lots to explore on the home page. "} />
    </DashboardLayout>
  )
}
