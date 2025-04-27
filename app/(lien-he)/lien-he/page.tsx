import type { Metadata } from "next"
import Image from "next/image"
import ContactForm from "./components/contact-form"
import ContactInfo from "./components/contact-info"

export const metadata: Metadata = {
    title: "Liên Hệ | Tiệm Kiện Trúc",
    description: "Liên hệ với Tiệm Kiện Trúc để được tư vấn về thiết kế xây dựng",
}

export default function ContactPage() {
    return (
        <main className="w-full">
            <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                    src="/assets/contact-us-banner.jpg"
                    alt="Conntact Us Banner"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div>
                        <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                            Liên Hệ
                        </h1>
                        <p className="max-w-xl mx-auto text-base md:text-lg lg:text-xl">
                            Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ về các dịch vụ thiết kế xây dựng.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container max-w-6xl py-8 mx-auto md:py-12 lg:py-16">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>
        </main>
    )
}
