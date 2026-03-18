import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import React from 'react'
import CTASection from '@/components/CTASection';

const HomeLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=''>
            <Navbar />
            <main ></main>
            {children}

            <CTASection />
            <Footer />
        </div>
    )
}

export default HomeLayout