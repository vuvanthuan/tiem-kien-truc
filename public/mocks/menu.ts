export const initMenu = [
    { label: 'Trang chủ', value: 'trang-chu' },
    { label: 'Giới Thiệu', value: 'gioi-thieu' },
    {
        label: 'Thiết Kế', value: 'thiet-ke',
        children: [
            { label: 'Quy hoạch cảnh quan', value: 'quy-hoach-canh-quan' },
            {
                label: 'Thiết kế Showroom', value: '',
                children: [
                    { label: 'Thiết kế Showroom Điện máy', value: 'thiet-ke-showroom-dien-may' },
                    { label: 'Thiết kế Showroom Ô tô', value: 'thiet-ke-showroom-o-to' },
                    { label: 'Thiết kế Showroom Thời trang', value: 'thiet-ke-showroom-thoi-trang' },
                    { label: 'Thiết kế Showroom Mỹ phẩm', value: 'thiet-ke-showroom-my-pham' },
                    { label: 'Thiết kế Showroom Gạch ốp lát', value: 'thiet-ke-showroom-gach-op-lat' },
                    { label: 'Thiết kế Showroom Nội thất', value: 'thiet-ke-showroom-noi-that' }
                ]
            },
            {
                label: 'Thiết kế nhà hàng', value: '',
                children: [
                    { label: 'Thiết kế nhà hàng lẩu nướng', value: 'thiet-ke-nha-hang-lau-nuong' },
                    { label: 'Thiết kế nhà hàng nhật', value: 'thiet-ke-nha-hang-nhat' },
                    { label: 'Thiết kế nhà hàng sân vườn', value: 'thiet-ke-nha-hang-san-vuon' },
                    { label: 'Thiết kế nhà hàng tiệc cưới', value: 'thiet-ke-nha-hang-tiec-cuoi' },
                    { label: 'Thiết kế nội thất nhà hàng', value: 'thiet-ke-noi-that-nha-hang' }
                ]
            },
            {
                label: 'Thiết kế khách sạn', value: '',
                children: [
                    { label: 'Thiết kế nội thất khách sạn', value: 'thiet-ke-noi-that-khach-san' }
                ]
            },
            {
                label: 'Thiết kế quán cafe', value: '',
                children: [
                    { label: 'Thiết kế nội thất quán cafe', value: 'thiet-ke-noi-that-quan-cafe' },
                    { label: 'Thiết kế quán cafe sân vườn', value: 'thiet-ke-quan-cafe-san-vuon' }
                ]
            },
            { label: 'Thiết kế spa', value: 'thiet-ke-spa' },
            { label: 'Thiết kế văn phòng', value: 'thiet-ke-van-phong' },
            { label: 'Nhà phố', value: 'nha-pho' },
            { label: 'Căn hộ', value: 'can-ho' },
            { label: 'Biệt thự', value: 'biet-thu' },
            { label: 'Dự án khác', value: 'du-an-khac' }
        ]
    },
    {
        label: 'Thi Công', value: 'thi-cong',
        children: [
            { label: 'Dự án thi công', value: 'du-an-thi-cong' }
        ]
    },
    {
        label: 'Báo giá', value: 'bao-gia',
        children: [
            { label: 'Báo giá thiết kế', value: 'bao-gia-thiet-ke' },
            { label: 'Báo giá thi công', value: 'bao-gia-thi-cong' }
        ]
    },
];
