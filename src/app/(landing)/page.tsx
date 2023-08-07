import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

type Props = {}

const LandingPage = (props: Props) => {
  return (
    <div>
      <h1>
        Landing Page (Unprotected)
      </h1>

      <Link href="/sign-in">
        <Button variant="link">
          Login
        </Button>
      </Link>

      <Link href="/sign-up">
        <Button variant="link">
          Register
        </Button>
      </Link>
    </div>
  )
}

export default LandingPage;