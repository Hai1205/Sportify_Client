## Tổng quan

Sportify là ứng dụng web nghe nhạc trực tuyến mô phỏng theo Spotify, với đầy đủ tính năng phát nhạc, quản lý bài hát, tương tác xã hội và nhiều tính năng khác.

- 🎵 Phát nhạc với đầy đủ điều khiển (play, pause, next, previous)
- 🎧 Hiển thị bài hát đang phát với thông tin chi tiết
- 📚 Trình duyệt bài hát và album
- 🎤 Trang chi tiết bài hát với lời và thông tin
- 💿 Trang chi tiết album với danh sách bài hát
- 🔍 Tìm kiếm bài hát, album và nghệ sĩ
- ❤️ Thích bài hát và album
- 👤 Hồ sơ người dùng và nghệ sĩ
- 🔐 Hệ thống xác thực đầy đủ
- 💬 Chat trực tiếp giữa người dùng
- 📱 Giao diện responsive


## Công nghệ sử dụng
- React 18
- TypeScript - Ngôn ngữ lập trình
- Vite - Build tool
- Tailwind CSS - Framework CSS
- shadcn/ui - Thư viện UI component
- Zustand - State management
- React Router - Routing
- Axios - HTTP Client
- WebSocket



## Cài đặt

Yêu cầu tiên quyết
- Node.js phiên bản 18.x trở lên
- npm hoặc yarn

Các bước cài đặt
1. Clone repository và truy cập thư mục frontend
```bash
git clone https://github.com/haole2k4/Sportify-Client.git
cd Sportify-Client
```
2. Cài đặt các dependencies
```bash 
npm install
```

3. Chỉnh sửa file .env để thiết lập các biến môi trường cần thiết, đặc biệt là URL backend và ws:

```bash
VITE_SERVER_URL=http://localhost:8000
VITE_SERVER_WS_URL=http://localhost:8001
VITE_CLIENT_ID=your-id
```

4. Khởi động fontend:
```bash
npm run dev
```

Ứng dụng frontend sẽ có sẵn tại http://localhost:3000

## Giấy phép

<div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #1DB954;">
  <p><strong>MIT License</strong></p>
  <p>Copyright (c) 2025 Spotify Clone Team</p>
  
  <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
  
  <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
  
  <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
</div>

## Thành viên
| Mã số sinh viên | Họ và tên         | 
|-----------------|-------------------|
| 3122410095      | Nguyễn Hoàng Hải  |
| 3122410096      | Lê Chí Hào        |
