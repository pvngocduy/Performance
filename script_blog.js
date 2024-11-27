import http from 'k6/http';
import { check, sleep } from 'k6';

// URL chính của trang web
const BASE_URL = 'https://www.android.com/';

// Danh sách các bài viết (URL)
const posts = [
  'intl/vi_vn/new-features-on-android/', // Thay bằng slug của bài viết cụ thể
  'intl/vi_vn/android-14/',
  'intl/vi_vn/safety/',
  'intl/vi_vn/google-messages/',
  'intl/vi_vn/why-android/',
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

  // 2. Lựa chọn ngẫu nhiên một bài viết từ danh sách
  const randomPost = posts[Math.floor(Math.random() * posts.length)];
  const postUrl = `${BASE_URL}${randomPost}`;
  
  const postResponse = http.get(postUrl);
  check(postResponse, {
    'Post loaded successfully': (res) => res.status === 200,
  });

  // 3. Giả lập thời gian đọc bài viết
  sleep(Math.random() * 1 + 5); // 1-5 giây đọc bài
}
