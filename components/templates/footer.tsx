'use client'

import Image from 'next/image';
import Link from 'next/link';

import { Mail, MapPin, Phone } from 'lucide-react';

interface Props {
    title: string;
    info: Info[];
}
interface Info {
    title: string;
    link: string;
}

const InformationFooter = ({ title, info }: Props) => {
    return (
        <ul className='flex flex-col items-start justify-end gap-2'>
            <h1 className='mb-2 text-2xl font-medium md:mb-5'>{title}</h1>
            {info.map((item, inx) => (
                <Link href={item.link} key={inx}>
                    <li>{item.title}</li>
                </Link>
            ))}
        </ul>
    );
};

const Footer = () => {

    return (
        <section className='w-full bg-slate-200 text-black'>
            <div className='flex-col-between-center gap-10 p-4 md:px-12 md:py-6 lg:px-24 lg:py-12'>
                <div className='pb-4 gap-4 md:gap-0 flex flex-col lg:flex-row w-full grid-cols-1 justify-start items-start md:justify-between md:items-center border-b-2 border-b-slate-300'>
                    <div className='flex justify-start items-center gap-2'>
                        <Image
                            priority={true}
                            width={300}
                            height={150}
                            src="/assets/logo.webp"
                            alt="@logo"
                            className="mr-auto flex-1 w-fit md:w-[250px] h-[100px] rounded-[4px] object-cover md:object-contain"
                        />
                        <p className='flex-shrink md:flex-shrink-0'>{new Date().getFullYear()} © Bản quyền thuộc về Tiệm Kiến Trúc</p>
                    </div>
                    <div className='w-full flex justify-start md:justify-end items-center gap-2'>
                        <Link
                            href="mailto:info@metaverse-solution.vn"
                            className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300"
                        >
                            <p>Liên hệ với chúng tôi</p>
                            <Image
                                src="/assets/email.png"
                                alt="@email"
                                width={56}
                                height={56}
                            />
                        </Link>
                    </div>
                </div>
                <div className='col-span-1 pt-10 grid w-full grid-cols-1 items-start justify-start gap-5 lg:grid-cols-4 lg:mt-0'>
                    <div className='flex-col-start gap-5 border-card-footer'>
                        <InformationFooter
                            title="Thiết kế"
                            info={[
                                { title: "Quy hoạch cảnh quan", link: '/solution/business-management' },
                                { title: "Thiết kế spa", link: '/solution/asset-valuation' },
                                { title: "Thiết kế văn phòng", link: '/solution/online-education' },
                                {
                                    title: "Nhà phố",
                                    link: '/solution/application-entertainment',
                                },
                                {
                                    title: "Căn hộ",
                                    link: '/solution/application-entertainment',
                                },
                                {
                                    title: "Biệt thự",
                                    link: '/solution/application-entertainment',
                                },
                                {
                                    title: "Dự án khác",
                                    link: '/solution/application-entertainment',
                                }
                            ]}
                        />
                    </div>
                    <div className='flex justify-start items-start lg:justify-center lg:items-center gap-5 border-card-footer'>
                        <InformationFooter
                            title="Về chúng tôi"
                            info={[
                                { title: "Giới thiệu", link: '#' },
                                { title: "Liên hệ", link: '#' },
                                { title: "Dự án thi công", link: '#' },
                                { title: "Báo giá thiết kế", link: '#' },
                                { title: "Báo giá thi công", link: '#' },
                            ]}
                        />
                    </div>
                    <div className='flex justify-start items-start lg:justify-center lg:items-center gap-5 border-card-footer'>
                        <InformationFooter
                            title="Hỗ trợ"
                            info={[
                                { title: "FAQ", link: '#' },
                                { title: "Kết nối", link: '#' },
                                { title: "Điều khoản sử dụng", link: '#' },
                            ]}
                        />
                    </div>
                    <div className='mt-5 flex flex-col justify-center items-start gap-4'>
                        {[
                            { title: "LK6B/23, C17 Bộ Công An, Khu Đô Thị Mỗ Lao, P.Mỗ Lao, Q. Hà Đông, Hà Nội", icon: <MapPin className='flex-shrink-0 w-[18px] h-[18px]' /> },
                            { title: "0904993688", icon: <Phone className='flex-shrink-0 w-[18px] h-[18px]' /> },
                            { title: "info@tiemkientruc.vn", icon: <Mail className='flex-shrink-0 w-[18px] h-[18px]' /> },
                        ].map((item, idx) => (
                            <div key={idx} className='flex items-center justify-start gap-2'>
                                {item.icon}
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
