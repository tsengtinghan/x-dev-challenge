'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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