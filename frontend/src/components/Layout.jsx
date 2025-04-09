import React from "react";
import Navbar from "./Navbar";
import OurPolicy from "./OurPolicy";
import NewsletterSingup from "./NewsletterSingup";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <OurPolicy/>
            <NewsletterSingup />
            <Footer />
        </>
    );
};

export default Layout;