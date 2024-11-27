import http from 'k6/http';
import { check, sleep } from 'k6';

// URL chính của trang web
const BASE_URL = 'https://maps.onehousing.vn/quy-hoach/tra-cuu-quy-hoach-bat-dong-san';

// Danh sách các bài viết (URL)
const posts = [
  '?lat=21.032692174666906&lng=105.84570755865712', // Thay bằng slug của bài viết cụ thể
  '?lat=21.032790437361484&lng=105.84566531386685',
  '?lat=21.03297131565658&lng=105.84587720838095',
  '?lat=21.03301450109926&lng=105.84586983230821',
  '?lat=21.032961927516453&lng=105.84583429304018',
  '?lat=21.03296443102174&lng=105.84612464216349',
  '?lat=21.033234809252505&lng=105.84575717953032',
  '?lat=21.033197882623583&lng=105.84631843176663',
  '?lat=21.033390026161754&lng=105.84617895689655',
  '?lat=21.033492043638788&lng=105.8463298311537',
  '?lat=21.033492043638788&lng=105.8463298311537'
];

// Cấu hình số lượng user và thời gian test
export const options = {
  vus: 500, // Số lượng user đồng thời
  duration: '100s', // Thời gian chạy test
};

export default function () {
  // 1. Truy cập vào trang chính
  const homepageResponse = http.get(BASE_URL);
  check(homepageResponse, {
    'Homepage loaded successfully': (res) => res.status === 200,
  });

  posts.forEach((post) => {
    const postUrl = `${BASE_URL}${post}`;
    const postResponse = http.get(postUrl);
    check(postResponse, {
      [`Post ${post} loaded successfully`]: (res) => res.status === 200,
    });

    // 3. Giả lập thời gian đọc bài viết
    sleep(Math.random() * 1 + 1);
  });
}
