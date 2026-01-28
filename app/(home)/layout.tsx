import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import React from 'react'

const HomeLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=''>
            <Navbar />
            <main className="pt-[84px]"></main>
            {children}
            <Footer />
        </div>
    )
}

export default HomeLayout