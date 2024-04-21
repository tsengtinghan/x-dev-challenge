'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>First, sign into X</CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button type="button" onClick={() => router.push('https://xlearn-rnuz.onrender.com/authorize')}>
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}