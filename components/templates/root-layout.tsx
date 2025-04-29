"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/templates/header";
import Footer from "@/components/templates/footer";
import FloatButtonSocialConnect from "@/components/templates/float-button-social-connect";
import BackToTop from "./back-to-top-button";

type RootLayoutTemplateProps = {
    children: React.ReactNode;
};

const RootLayoutTemplate = ({ children }: RootLayoutTemplateProps) => {
    const pathname = usePathname();

    if (pathname?.startsWith("/studio")) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return (
        <React.Fragment>
            <Header />
            {children}
            <FloatButtonSocialConnect />
            <BackToTop />
            <Footer />
        </React.Fragment>
    );
};

export default RootLayoutTemplate;
