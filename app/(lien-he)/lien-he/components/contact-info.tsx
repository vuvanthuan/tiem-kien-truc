"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"

import { Card, CardContent } from "@/components/molecules/card"

export default function ContactInfo() {
    const contactItems = [
        {
            icon: <Phone className="w-5 h-5" />,
            title: "Điện thoại",
            content: "0904993688",
            delay: 0.1,
        },
        {
            icon: <Mail className="w-5 h-5" />,
            title: "Email",
            content: "info@tiemkientruc.vn",
            delay: 0.2,
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            title: "Địa chỉ",
            content: "LK6B/23, C17 Bộ Công An, Khu Đô Thị Mỗ Lao, P.Mỗ Lao, Q. Hà Đông, Hà Nội",
            delay: 0.3,
        },
    ]

    return (
        <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="mb-6 text-2xl font-bold">Thông tin liên hệ</h2>
                <p className="mb-8 text-muted-foreground">
                    Tiệm Kiện Trúc chuyên cung cấp dịch vụ thiết kế và tư vấn xây dựng chuyên nghiệp. Hãy liên hệ với chúng tôi để
                    được hỗ trợ tốt nhất.
                </p>
            </motion.div>

            <div className="space-y-4">
                {contactItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: item.delay }}
                    >
                        <Card>
                            <CardContent className="flex items-start p-4">
                                <div className="p-3 mr-4 rounded-full bg-primary/10">{item.icon}</div>
                                <div>
                                    <h3 className="font-medium">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.content}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
            >
                <div className="w-full overflow-hidden border rounded-lg aspect-video">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1957534418!2d105.78388!3d20.983333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2zS2h1IMSRw7QgdGjhu4sgTeG7lSBMYW8sIEjDoCDEkMO0bmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1713290419!5m2!1svi!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </motion.div>
        </div>
    )
}
