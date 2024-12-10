"use client"
import React from 'react'

export default function error({ error }: { error: any }) {
  return (
    <div>{error.message}</div>
  )
}
