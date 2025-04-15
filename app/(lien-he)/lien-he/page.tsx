import type { Metadata } from "next"

import ContactForm from "./components/contact-form"
import ContactInfo from "./components/contact-info"

export const metadata: Metadata = {
    title: "Liên Hệ | Tiệm Kiện Trúc",
    description: "Liên hệ với Tiệm Kiện Trúc để được tư vấn về thiết kế xây dựng",
}

export default function ContactPage() {
    return (
        <main className="w-full">
            <div className="container max-w-6xl py-4 mx-auto md:py-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">Liên Hệ</h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                        Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ về các dịch vụ thiết kế xây dựng.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>
        </main>
    )
}
