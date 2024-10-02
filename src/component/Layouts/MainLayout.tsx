import React from 'react'

type Props = {
    children: React.ReactNode
}

const MainLayout = (props: Props) => {
    const {children} = props

  return (
    <main className='w-full mx-auto max-w-[1440px]'>
        {children}
    </main>
  )
}

export default MainLayout