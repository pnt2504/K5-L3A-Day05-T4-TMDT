# Checklist Lab T4 – Thương mại điện tử

Bài lab mô phỏng trợ lý khiếu nại **hàng nhận không đúng mô tả**. Làm theo thứ tự dưới đây và tích ô sau khi kiểm tra xong. Dùng dữ liệu giả cho toàn bộ bài.

## 1. Chuẩn bị thư mục và nhóm

- [ ] Mở thư mục `K5-L3A-Day05-T4-TMDT` trong Codex hoặc trình soạn thảo. Mở PowerShell tại thư mục này và kiểm tra hai file:

  ```powershell
  Get-Item .\spec.md, .\prototype\index.html | Select-Object Name, Length
  git status --short --branch
  ```

- [ ] Mở `spec.md`. Thay dàn ý bằng bài làm của nhóm, bỏ cặp dấu ba backtick bao quanh phần mẫu. Điền lớp, bàn/zone, track T4, họ tên, mã học viên và phần việc thực tế của đủ 3 người.
- [ ] Đọc [đề Track 4](https://github.com/VinUni-AI20k/K5-L3-Day05-AI-Product-UX-Autonomy/blob/main/tracks/t4-ecommerce.md) và [rubric](https://github.com/VinUni-AI20k/K5-L3-Day05-AI-Product-UX-Autonomy/blob/main/04-rubric.md). Dùng ca **Tem khớp với mô tả** để demo tình huống bắt buộc khi người bán đúng.

## 2. Viết `spec.md` đến hết §4

- [ ] **§1 – Phạm vi.** Chép lát cắt từ đề T4. Nêu ít nhất 3 việc nằm ngoài phạm vi và vì sao, chẳng hạn tự khóa shop, tiết lộ số điện thoại và tự kết luận hàng giả.
- [ ] **§2 – Kịch bản (M1).** Viết ít nhất 8 tin nhắn giả lập, phủ 4 lớp: AI bịa khi thiếu căn cứ, tin mơ hồ, yêu cầu ngoài thẩm quyền và sai sót có hậu quả lớn. Mỗi dòng có lỗi có thể xảy ra, tool hoặc dữ liệu liên quan, cách xử lý và nhãn mức hại.
- [ ] **§2 – Chọn 2 ca đắt nhất.** Có thể phân tích việc hoàn tiền nhầm khi bằng chứng khớp và việc đóng khiếu nại nhầm khi shop đã nhận gửi sai. Viết ai chịu thiệt, vì sao hai ca này được chọn và ca nào suýt được chọn.
- [ ] **§3 – UX khi AI sai.** Với mỗi ca khó, viết câu AI nói nguyên văn, dữ liệu người mua thấy, việc người bán cần làm, nút tiếp theo, ai được báo và khi nào. Ghi loại lỗi, phương án đã cân nhắc và lý do chọn. Chỉ ra lỗi cần chặn trong luồng, ví dụ chặn quyết định khi chỉ có mô tả hiện tại.
- [ ] **§3 – Nguyên tắc UX.** Chọn 2–3 nguyên tắc HAX/PAIR và trỏ vào thành phần cụ thể. Ví dụ G10 ở nhánh dừng khi thiếu căn cứ, G11 ở phần nguồn và thời điểm của mô tả, G9 ở nút sửa hoặc bổ sung bằng chứng.
- [ ] **§4 – Quyền của AI (M2).** Xếp mức cho đủ 5 tool: `yeu_cau_bang_chung`, `chuyen_truong_nhom`, `soan_hoan_tien`, `tu_choi_khieu_nai`, `phat_shop`. Ghi ai chịu thiệt khi làm sai, có đảo được không, chờ duyệt mất gì và phương án nào nhóm đã loại. `soan_hoan_tien` trong đề thực sự chuyển tiền.
- [ ] **§4 – Kiểm tra quyết định.** Ghi tool khó xếp nhất và các phương án nhóm đã cân nhắc. Với tool cần duyệt, ghi ai duyệt, họ thấy gì, quá hạn xử lý thế nào. Thử trên 2 ca khó và 1 ca bình thường như shop đã nhận gửi nhầm size. Ghi lại một lời hứa với người dùng thay đổi theo mức tự chủ đã chọn.

## 3. Dựng và chạy prototype trên Windows

- [ ] Chạy `prototype/index.html` và demo ca **Tem khớp với mô tả** theo luồng **xem căn cứ → bổ sung ảnh mẫu và gửi hồ sơ → shop gửi phản hồi → nhân viên xác nhận**. Bấm **Chuyển nhân viên** nếu muốn minh họa ca hồ sơ được gửi trước khi có ảnh đo. Dùng ca **Shop nhận gửi nhầm đồ** để minh họa bản nháp có hoàn tác và bước duyệt hoàn tiền. Kiểm tra quyền của các vai khớp §4.
- [ ] Để demo giới hạn quyền, chọn **Nghi hàng giả, đòi khóa shop**. Gõ yêu cầu khóa shop, xem phản hồi của AI, rồi bấm **Xem báo cáo nghi hàng giả** → **Xác nhận gửi báo cáo**. Trong **Luồng xử lý AI**, kiểm tra báo cáo đã sang bộ phận chuyên trách và đang chờ xác minh.
- [ ] Nếu dùng Codex để dựng giao diện, lưu quyết định của nhóm vào `spec.md` trước rồi gửi yêu cầu sau:

  > Đọc §2–§4 trong spec.md và dựng prototype HTML trong prototype/index.html cho ca demo nhóm đã chọn. Dùng dữ liệu giả, CSS và JavaScript trong cùng file. Cho bấm từ đầu đến cuối, hiển thị nguồn và thời điểm của bằng chứng, phản hồi và hạn phản hồi của shop, cùng trạng thái cuối. Thể hiện ít nhất hai mức tự chủ theo §4. Dùng đúng lời thoại và quyền nhóm đã chốt.

- [ ] Lưu file HTML. Tại thư mục bài làm, mở bằng trình duyệt mặc định:

  ```powershell
  Start-Process (Resolve-Path .\prototype\index.html).Path
  ```

  Nếu thấy trang trắng, kiểm tra cột `Length` bằng lệnh ở bước 1. `Length = 0` nghĩa là file còn trống. Sau khi lưu nội dung, tải lại trang bằng `Ctrl+R`. Với HTML độc lập, có thể mở trực tiếp từ File Explorer.

- [ ] **Chạy với LLM thật (bonus).** Mở PowerShell 7 tại thư mục bài làm, nhập khóa khi được hỏi và giữ cửa sổ mở trong lúc demo:

  ```powershell
  $env:T4_LLM_API_KEY = Read-Host 'Nhập khóa API của router' -MaskInput
  node .\prototype\server.cjs
  ```

  Mở [prototype cục bộ](http://127.0.0.1:4174/) và hỏi “Tôi cần gửi ảnh gì?” trong tab **Khách hàng (người mua)**. Tab **Người bán** cũng có chat thật. Tin nhắn được gửi kèm hồ sơ mẫu tới model, vì vậy chỉ nhập thông tin giả. Vào **Luồng xử lý AI** để đối chiếu bằng chứng và vào **Nhân viên** để xem hồ sơ, đóng khiếu nại hoặc duyệt hoàn tiền mô phỏng. Nếu router báo lỗi, các thao tác trên hồ sơ vẫn dùng được. Khi hoàn tất, nhấn `Ctrl+C` rồi chạy `Remove-Item Env:T4_LLM_API_KEY` để xóa khóa khỏi cửa sổ PowerShell.

- [ ] **Chạy thử (M3).** Bấm hết ca demo. Xác minh nút đóng khiếu nại vẫn bị khóa khi thiếu ảnh đo hoặc shop chưa phản hồi. Kiểm tra có ít nhất 2 mức tự chủ nhìn thấy được và trạng thái cuối khớp §4. Thử hoàn tác bản nháp và kiểm tra chỉ nhân viên có nút duyệt hoàn tiền.
- [ ] **§5 – Bằng chứng.** Chụp 1–2 ảnh, đánh số các vị trí quan trọng và lưu trong `prototype/`. Trong `spec.md`, ghi vị trí, nguyên tắc UX, mức tự chủ, phần nào mô phỏng và lý do chọn cách hiển thị đó.
- [ ] **§6 – Pass/Fail.** Viết 3 tiêu chí có thể kiểm tra. Ví dụ: mô tả hiện tại không được dùng làm căn cứ duy nhất, tiền chỉ chuyển khi người có quyền duyệt, shop thấy hạn phản hồi. Chấm thử từng tiêu chí trên cả hai ca khó và ghi lỗi còn lại.

## 4. Demo và nộp bài

- [ ] Chia demo cho 3 thành viên. Một người nêu lát cắt và rủi ro, một người bấm qua ca khó, một người giải thích mức tự chủ và cách xử lý ca lạ. Sau demo, ghi ca lạ thực tế và phản hồi của nhóm vào §7.
- [ ] Kiểm tra gói nộp có `spec.md`, `prototype/index.html` và 1–2 ảnh đánh số. Tạo repo GitHub mới, trống và công khai theo tên `K5-L3A-Day05-T4-TenNhom`. Nếu repo hiện tại đã là repo riêng của nhóm và đáp ứng các yêu cầu đó, dùng repo đó.
- [ ] Xác minh đích push là repo nhóm. Nếu `origin` đang trỏ sang repo khác, có thể thêm đích `submission` và push riêng. Thay URL ví dụ bên dưới bằng URL repo nhóm trước khi chạy:

  ```powershell
  git remote -v
  git add -- spec.md prototype/
  git diff --cached --stat
  git diff --cached --name-only
  git commit -m "Complete T4 e-commerce lab"
  git remote add submission https://github.com/TaiKhoan/K5-L3A-Day05-T4-TenNhom.git
  git push submission HEAD:main
  ```

  Nếu `origin` đã là repo nộp đúng, dùng `git push origin HEAD:main` thay hai lệnh cuối. Kiểm tra danh sách file đã stage trước khi commit. Các lệnh trên dành cho repo Git cục bộ hiện tại nếu lịch sử repo là của nhóm. Nếu lịch sử là bản clone của đề, tạo repo cục bộ mới từ các file bài làm trước khi push.

- [ ] Mở link repo bằng cửa sổ ẩn danh, kiểm tra thấy `spec.md`, prototype và ảnh. Gửi link theo kênh giảng viên thông báo. Hạn trong đề cho lớp L3A là **23:59 ngày 12/11/2026**.

[Hướng dẫn từng chặng](https://github.com/VinUni-AI20k/K5-L3-Day05-AI-Product-UX-Autonomy/blob/main/02-guide.md) · [Quy định nộp bài](https://github.com/VinUni-AI20k/K5-L3-Day05-AI-Product-UX-Autonomy#n%E1%BB%99p-b%C3%A0i)
