const siteUrl = "https://tiemkientruc.vn";

const staticPaths = {
  "/": { changefreq: "daily", priority: 1.0 },
  "/blog": { changefreq: "weekly", priority: 0.8 },
  "/lien-he": { changefreq: "monthly", priority: 0.7 },
  "/thu-vien": { changefreq: "weekly", priority: 0.8 },
  "/bao-gia/bao-gia-thiet-ke": { changefreq: "monthly", priority: 0.9 },
  "/bao-gia/bao-gia-thi-cong": { changefreq: "monthly", priority: 0.9 },
  "/gioi-thieu/gioi-thieu-chung": { changefreq: "monthly", priority: 0.7 },
  "/gioi-thieu/gioi-thieu-doi-ngu-nhan-su": {
    changefreq: "monthly",
    priority: 0.7,
  },
  "/gioi-thieu/gioi-thieu-quy-trinh-lam-viec": {
    changefreq: "monthly",
    priority: 0.7,
  },
  "/gioi-thieu/gioi-thieu-ho-so-nang-luc": {
    changefreq: "monthly",
    priority: 0.7,
  },
};

const initMenu = [
  { label: "Trang chủ", value: "" },
  {
    label: "Giới Thiệu",
    value: "gioi-thieu",
    children: [
      { label: "Giới thiệu chung", value: "gioi-thieu-chung" },
      { label: "Đội ngũ nhân sự", value: "gioi-thieu-doi-ngu-nhan-su" },
      { label: "Quy trình làm việc", value: "gioi-thieu-quy-trinh-lam-viec" },
      { label: "Hồ sơ năng lực", value: "gioi-thieu-ho-so-nang-luc" },
    ],
  },
  {
    label: "Thiết Kế",
    value: "thiet-ke",
    children: [
      { label: "Quy hoạch cảnh quan", value: "quy-hoach-canh-quan" },
      {
        label: "Thiết kế Showroom",
        value: "",
        children: [
          {
            label: "Thiết kế Showroom Điện máy",
            value: "thiet-ke-showroom-dien-may",
          },
          { label: "Thiết kế Showroom Ô tô", value: "thiet-ke-showroom-o-to" },
          {
            label: "Thiết kế Showroom Thời trang",
            value: "thiet-ke-showroom-thoi-trang",
          },
          {
            label: "Thiết kế Showroom Mỹ phẩm",
            value: "thiet-ke-showroom-my-pham",
          },
          {
            label: "Thiết kế Showroom Gạch ốp lát",
            value: "thiet-ke-showroom-gach-op-lat",
          },
          {
            label: "Thiết kế Showroom Nội thất",
            value: "thiet-ke-showroom-noi-that",
          },
        ],
      },
      {
        label: "Thiết kế nhà hàng",
        value: "",
        children: [
          {
            label: "Thiết kế nhà hàng lẩu nướng",
            value: "thiet-ke-nha-hang-lau-nuong",
          },
          { label: "Thiết kế nhà hàng nhật", value: "thiet-ke-nha-hang-nhat" },
          {
            label: "Thiết kế nhà hàng sân vườn",
            value: "thiet-ke-nha-hang-san-vuon",
          },
          {
            label: "Thiết kế nhà hàng tiệc cưới",
            value: "thiet-ke-nha-hang-tiec-cuoi",
          },
          {
            label: "Thiết kế nội thất nhà hàng",
            value: "thiet-ke-noi-that-nha-hang",
          },
        ],
      },
      {
        label: "Thiết kế khách sạn",
        value: "",
        children: [
          {
            label: "Thiết kế nội thất khách sạn",
            value: "thiet-ke-noi-that-khach-san",
          },
        ],
      },
      {
        label: "Thiết kế quán cafe",
        value: "",
        children: [
          {
            label: "Thiết kế nội thất quán cafe",
            value: "thiet-ke-noi-that-quan-cafe",
          },
          {
            label: "Thiết kế quán cafe sân vườn",
            value: "thiet-ke-quan-cafe-san-vuon",
          },
        ],
      },
      { label: "Thiết kế spa", value: "thiet-ke-spa" },
      { label: "Thiết kế văn phòng", value: "thiet-ke-van-phong" },
      { label: "Nhà phố", value: "nha-pho" },
      { label: "Căn hộ", value: "can-ho" },
      { label: "Biệt thự", value: "biet-thu" },
      { label: "Dự án khác", value: "du-an-khac" },
    ],
  },
  {
    label: "Thi Công",
    value: "thi-cong",
    children: [{ label: "Dự án thi công", value: "du-an-thi-cong" }],
  },
  {
    label: "Báo giá",
    value: "bao-gia",
    children: [
      { label: "Báo giá thiết kế", value: "bao-gia-thiet-ke" },
      { label: "Báo giá thi công", value: "bao-gia-thi-cong" },
    ],
  },
];

function flattenMenu(menu, parentPath = "") {
  let urls = [];
  for (const item of menu) {
    const path = item.value ? `${parentPath}/${item.value}` : parentPath;
    if (path) urls.push(path);
    if (item.children) {
      urls = urls.concat(flattenMenu(item.children, path));
    }
  }
  return urls;
}

const menuPaths = flattenMenu(initMenu);

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 1.0,
  exclude: ["/api/*", "/studio/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/studio/*"],
      },
    ],
  },
  transform: async (config, path) => {
    const settings = staticPaths[path];
    return {
      loc: `${siteUrl}${path}`,
      changefreq: settings?.changefreq || "daily",
      priority: settings?.priority || 1.0,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    const paths = Object.keys(staticPaths);
    const uniquePaths = [...new Set(paths)];
    const results = [];

    for (const path of uniquePaths) {
      const item = await config.transform(config, path);
      if (item) {
        results.push(item);
      }
    }
    return results;
  },
};
