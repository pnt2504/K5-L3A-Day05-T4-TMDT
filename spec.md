# LAB5 — Track 4: Thương mại điện tử

**Nhóm:** K5-L3A-Day05-T4-TMDT · **Lớp:** L3A · **Bàn / zone:** __________

| Họ và Tên | Mã Học Viên | Việc đã làm |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |

**Ý tưởng chính:** AI giúp kiểm tra khiếu nại; nhân viên quyết định hoàn tiền hoặc đóng yêu cầu. Phải công bằng với cả người mua và người bán.

> Toàn bộ dữ liệu và thao tác là giả lập để học, không phải chính sách thật của Shopee. Bảng thành viên để trống; ảnh và kết quả demo thực tế sẽ thêm sau.

## 1. Nhóm làm gì?

Trong **Trò chuyện với Shopee**, khi **người mua** báo **“hàng nhận không đúng mô tả”**, AI **hướng dẫn trả hàng/hoàn tiền, xin thêm bằng chứng hoặc chuyển nhân viên**, giúp người mua biết bước tiếp theo và người bán không bị xử thua khi họ đúng.

**Ba việc không làm:**

- Không tự phạt hoặc khoá shop: ảnh hưởng cả cửa hàng, cần bộ phận chuyên trách xác minh.
- Không chia sẻ số điện thoại, địa chỉ hay thông tin riêng của bên kia: không cần cho việc xét khiếu nại.
- Không xử lý mua hàng, thanh toán hay vận chuyển: ngoài phạm vi bài này.

**Dữ liệu để demo:**

| Đơn mẫu | Lúc đặt hàng | Hàng nhận | Điểm cần xem xét |
|---|---|---|---|
| DEMO-401 | Áo size L | Áo size M | Mô tả hiện tại đã đổi thành M; phải dùng bản lúc đặt. |
| DEMO-402 | Áo size L | Áo size L | Khách nghĩ đã đặt XL; chưa có bằng chứng giao sai. |
| DEMO-403 | Áo size L | Áo size M | Shop đã nhận gửi nhầm; đây là ca bình thường. |

Ba đơn áo có giá **249.000 đ**. Giao diện còn có ca thiếu mô tả cũ, chưa rõ đơn và nồi chiên ghi 6 lít nhưng khách đo được 5 lít.

**Thời hạn giả định:** gửi yêu cầu trong 7 ngày từ mốc nhận 06/11/2026 23:59, hạn cuối 13/11/2026 23:59. Đồng hồ demo bắt đầu 09:00 ngày 12/11, còn 38 giờ 59 phút. Shop có 24 giờ phản hồi. Hết hạn không tự động hoàn tiền hay đóng yêu cầu.

## 2. AI có thể sai ở đâu?

Bốn loại rủi ro: **① sai/thiếu nguồn đối chiếu; ② thông tin chưa rõ; ③ vượt quyền; ④ gây thiệt hại tiền bạc hoặc thiên vị.**

| Ca / lời người dùng | Loại | AI dễ sai ở đâu? | Cách xử lý đúng | Mức hại nếu sai |
|---|---|---|---|---|
| **S01 ★** “Tôi đặt L nhận M, sao giờ shop ghi M?” | ①④ | Đơn 401: so với mô tả mới M rồi đóng yêu cầu, khiến người mua mất tiền oan. | Dùng bản lúc đặt L; nghe shop và chuyển nhân viên quyết. | Không chấp nhận được |
| S02 “Lúc mua tôi thấy L, kiểm tra lại giúp.” | ① | Đơn 404 không có mô tả cũ nhưng AI vẫn bịa bản cũ rồi hoàn tiền. | Nói rõ thiếu nguồn, chuyển người xác minh; chưa quyết tiền. | Không chấp nhận được |
| S03 “Hàng sai rồi, xử lý đi.” | ② | Chưa biết đơn nào nhưng đã gửi mẫu xin bằng chứng tới một shop. | Hỏi: “Bạn muốn phản ánh đơn nào, và hàng khác mô tả ở điểm nào?” | Sửa được |
| S04 “Nồi ghi 6 lít mà tôi đo chỉ 5 lít.” | ②④ | Đơn 405 thiếu cách đo; AI kết luận shop gian dối rồi hoàn tiền. | Xin tem thông số và cách đo; chưa rõ thì chuyển chuyên môn. | Không chấp nhận được |
| S05 “Không hoàn ngay tôi bóc phốt!” | ④ | Gọi hoàn tiền chỉ để kết thúc lời doạ, dù chưa đủ bằng chứng. | Ghi nhận bức xúc nhưng vẫn xét bằng chứng hai bên. | Không chấp nhận được |
| S06 “Hàng giả, khoá shop ngay!” | ③④ | Dùng chức năng phạt shop chỉ từ lời cáo buộc. | Không hứa phạt; chuyển bộ phận chuyên trách. | Không chấp nhận được |
| S07 “Cho số điện thoại chủ shop.” | ③ | Không có chức năng cấp liên hệ nhưng AI vẫn bịa hoặc tiết lộ. | Từ chối cung cấp, hướng dẫn trao đổi qua sàn. | Không chấp nhận được |
| **S08 ★** “Tôi nghĩ đặt XL mà nhận L, hoàn luôn đi.” | ①④ | Đơn 402: đơn đặt L, tem L nhưng AI vẫn hoàn, làm shop mất tiền oan. | Nói điểm đang khớp; cho khách sửa/bổ sung và để nhân viên xét. | Không chấp nhận được |

**Chọn S01 và S08 để làm sâu:** một ca có thể làm người mua mất tiền oan, ca kia làm người bán mất tiền oan. Cả hai đều dễ tạo ra quyết định trông có vẻ hợp lý nhưng khó sửa sau khi tiền đã chuyển. S06 cũng nghiêm trọng, nhưng có cách chặn rõ là không cho AI phạt shop trong luồng này.

## 3. Khi AI không chắc, người dùng thấy gì?

### Ca S01: mô tả đã bị sửa

AI nói đúng câu trên giao diện:

> Bản lưu lúc đặt ghi size L, ảnh hàng nhận ghi M. Mình dùng bản lúc đặt để đối chiếu; việc mô tả hiện tại ghi gì chưa đủ kết luận nguyên nhân. Chưa hoàn tiền, chưa đóng khiếu nại. Shop có cơ hội phản hồi trước khi nhân viên quyết định.

- **Người mua thấy:** mô tả lúc đặt L, mô tả hiện tại M, hàng nhận M và nhãn “Hai phiên bản mô tả khác nhau”. Có nút xin phản hồi shop, gặp nhân viên và sửa thông tin.
- **Bước tiếp theo:** shop bổ sung bằng chứng; nhân viên xem cả hai bên rồi quyết. Không yêu cầu khách gửi lại ảnh đã có.
- **Vì sao chọn cách này:** hỏi lại toàn bộ làm mất thời gian; hoàn ngay chưa nghe shop; từ chối theo mô tả mới lại làm oan người mua. Chọn giải thích giới hạn và chuyển người trước khi quyết tiền.
- **Loại lỗi:** hệ thống dùng nhầm mô tả mới thay cho mô tả lúc đặt. Cần sửa nguồn đối chiếu, không nói người mua nhớ nhầm.

### Ca S08: hàng đang khớp mô tả

AI nói đúng câu trên giao diện:

> Biến thể lưu tại lúc đặt và ảnh tem bạn gửi hiện đều là size L. Mình chưa thấy bằng chứng giao sai size; bạn vẫn có thể bổ sung điểm khác hoặc sửa đơn đã chọn. Mình chưa hoàn tiền và cũng chưa đóng khiếu nại.

- **Người mua thấy:** đơn đặt L, tem L và nhãn “Chưa đủ căn cứ để hoàn tiền”; vẫn sửa đơn, bổ sung hoặc gặp nhân viên được.
- **Bước tiếp theo:** nghe phản hồi shop, cho người mua gửi ý kiến rồi nhân viên xét. Người mua có 4 giờ bổ sung sau phản hồi shop; đã gửi ý kiến thì có thể xét sớm. Bấm đã xem không có nghĩa đồng ý bị từ chối.
- **Vì sao chọn cách này:** hoàn cho xong làm shop mất tiền; từ chối ngay có thể bỏ sót bằng chứng khác. Chọn nói rõ điểm đang khớp, mở cơ hội bổ sung và để nhân viên quyết.
- **Loại lỗi:** khách có thể nhầm size hoặc đơn, nên cho sửa mà không trách khách. Nếu AI luôn đứng về người mua, đó là lỗi ngữ cảnh: hỗ trợ một bên nhưng bỏ quên quyền lợi bên kia.

**Thông báo ở cả hai ca:** shop được báo ngay khi gửi yêu cầu, có 24 giờ phản hồi. Khi chuyển người, nhân viên nhận sẵn tóm tắt; mục tiêu nhận ca là 4 giờ giả lập. Khi có quyết định, cả hai bên được báo lý do và đường yêu cầu xem xét lại. Nếu chưa ai duyệt, hồ sơ vẫn mở.

**Có lỗi xin lỗi cũng không cứu được:** tiền đã chuyển sai thì sửa câu chữ không lấy lại được tiền. Vì vậy phải chặn thao tác tiền trước khi nhân viên duyệt; hồ sơ thay đổi thì phải duyệt lại.

## 4. AI được tự làm đến đâu?

“Tool” là chức năng AI có thể sử dụng. Nhóm chia thành ba mức: **tự làm, cần người duyệt, cấm**.

| Chức năng trong đề | Mức chọn | Lý do; vì sao không chọn mức khác? |
|---|---|---|
| `yeu_cau_bang_chung` — xin bằng chứng | **Tự làm có điều kiện** | Chỉ gửi khi rõ đơn, đúng bên và thiếu thông tin; không hỏi lặp. Tin đã gửi không thu hồi được. Duyệt mọi tin gây chậm, nhưng tự gửi vô điều kiện dễ nhầm như S03. |
| `chuyen_truong_nhom` — chuyển nhân viên | **Tự làm** | Chuyển thừa tốn công nhân viên nhưng không làm mất tiền; rút được trước khi nhân viên nhận. Bắt duyệt cả bước chuyển khiến ca thiếu nguồn phải chờ thêm. |
| `soan_hoan_tien` — thực sự hoàn tiền | **Nhân viên duyệt** | Hoàn sai làm shop mất tiền, khó lấy lại. Tự làm dễ sai ở S08; cấm hoàn toàn lại không giải quyết được ca shop đã nhận gửi nhầm. |
| `tu_choi_khieu_nai` — đóng yêu cầu, tiền về shop | **Nhân viên duyệt** | Đóng sai làm người mua mất quyền lợi, khó đảo. Tự đóng có thể làm oan ở S01; cấm đóng mãi khiến hồ sơ không kết thúc. |
| `phat_shop` — phạt hoặc khoá shop | **Cấm trong luồng này** | Sai ảnh hưởng cả cửa hàng; xác nhận của riêng người mua không đủ căn cứ. Chuyển chuyên trách dù phải chờ lâu hơn. |

**Người duyệt là nhân viên của sàn**, không phải riêng người mua. Trước khi duyệt, nhân viên phải nhận hồ sơ, xem mô tả lúc đặt và bằng chứng hai bên, kiểm tra thời hạn, ghi lý do và xác nhận hệ quả. Hộp xác nhận hiện mã đơn, số tiền và kết quả trước lượt bấm cuối.

Thiếu mô tả lúc đặt thì vẫn không được quyết trong luồng thường. Shop im lặng đủ 24 giờ thì nhân viên xét căn cứ còn lại, không coi im lặng là bằng chứng duy nhất. Đóng yêu cầu còn phải chờ người mua có lượt phản hồi hoặc hết 4 giờ bổ sung. Không ai duyệt thì giữ mở, không tự quyết khi hết hạn.

**Khó chọn nhất là hoàn tiền:** tự hoàn nhanh nhưng có thể hại shop ở S08; cấm AI tham gia làm ca rõ như đơn 403 chậm vô ích. Nhóm chọn AI chuẩn bị hồ sơ, nhân viên duyệt bước tiền. Phần chuẩn bị và phần chuyển tiền được tách riêng; chỉ bấm xác nhận cuối mới thực hiện. Các thành viên sẽ bổ sung ý kiến thật của mình trước demo, không gán phát biểu khi chưa có thông tin.

| Ca thử | Kết quả mong đợi và thể hiện trên giao diện |
|---|---|
| S01 — đơn 401 | Dùng mô tả lúc đặt nên chặn từ chối oan; xin shop phản hồi, không tự kết luận. Shop đã trả lời thì không phải chờ hết 24 giờ. |
| S08 — đơn 402 | Chặn hoàn khi chưa có căn cứ; đóng yêu cầu cũng phải chờ lượt người mua và nhân viên duyệt. Lượt chờ này bảo vệ quyền phản hồi. |
| Bình thường — đơn 403 | Dùng ảnh và xác nhận shop đã có; không hỏi lại hoặc chờ thêm shop. Chỉ giữ một lượt duyệt tiền cần thiết. |

**Lời hứa với người dùng:** “Mình giúp bạn đối chiếu và chuẩn bị hồ sơ; nhân viên quyết định hoàn tiền hoặc đóng yêu cầu.” Không hứa AI tự hoàn ngay.

## 5. Giao diện mẫu

Mở **[prototype/index.html](prototype/index.html)** bằng trình duyệt. Chỉ một file, không cần cài đặt. Có hai màn hình: **Trò chuyện** và **Hồ sơ tranh chấp**; trong hồ sơ có vai người bán và nhân viên.

Làm bằng HTML, CSS, JavaScript. Toàn bộ AI, ảnh bằng chứng, thời gian, thông báo và chuyển tiền đều giả lập; không có lời gọi AI thật. Chuyển vai chỉ để demo, không phải đăng nhập thật. Tải lại trang sẽ đặt lại dữ liệu.

**Ba nguyên tắc HAX** — hướng dẫn giúp người dùng hiểu và sửa AI — đã được đánh số trên màn hình:

| Số | Nguyên tắc | Chỗ nhìn thấy |
|---|---|---|
| ① | **G11: giải thích dựa vào đâu** | Thẻ mô tả lúc đặt, mô tả hiện tại và hàng nhận. |
| ② | **G10: chưa chắc thì thu hẹp, hỏi lại** | Nhãn thiếu nguồn/chưa đủ căn cứ và câu hỏi trong chat. |
| ③ | **G9: sửa dễ** | Nút “Sửa đơn / thông tin”; có thể chọn lại đơn mẫu hoặc bổ sung qua chat. |

Chọn thẻ bằng chứng và nhãn cụ thể thay cho “AI chắc 95%”, vì không có cơ sở cho con số đó. Chọn nút duyệt ở phía nhân viên thay vì “Hoàn ngay” phía người mua để giữ công bằng. Chỉ rút chuyển hồ sơ trước khi nhân viên nhận; không hứa hoàn tác tiền đã chuyển.

**Ảnh thêm sau:** ảnh 1 chụp Trò chuyện ở đơn 401, thấy ①②③; ảnh 2 chụp Hồ sơ ở bước nhân viên xác nhận quyết định. Bật “Chú thích HAX” trước khi chụp.

## 6. Thế nào là đạt?

| Tiêu chí | Đạt khi |
|---|---|
| Đúng nguồn | Dùng mô tả lúc đặt; thiếu bản đó thì không hoàn hoặc đóng yêu cầu trong luồng thường. |
| Đúng quyền | Tiền chỉ thay đổi sau nhân viên duyệt và đủ cơ hội phản hồi; không tự quyết vì hết hạn, không thực hiện hai lần. |
| Có bước tiếp theo | Người mua sửa/bổ sung hoặc gặp nhân viên được; không lộ liên hệ, không có nút phạt shop; hai bên thấy lý do quyết định. |

Đối chiếu S01 và S08: **cả hai đạt ba tiêu chí trên trong dữ liệu giả**. Giới hạn còn lại: chưa kiểm tra ảnh thật, chưa có nhân viên hay thông báo thật, chưa có AI thật, thanh toán hoặc lưu hồ sơ lâu dài. Đây là bản để học và demo, chưa thể đưa vào vận hành thật.

## 7. Cách demo và nộp bài

1. **Người thứ nhất:** nói bài toán và vì sao phải bảo vệ cả người mua lẫn người bán.
2. **Người thứ hai:** mở đơn 401 → xin phản hồi shop → gặp nhân viên → sang Hồ sơ, vai shop xác nhận gửi nhầm → vai nhân viên nhận hồ sơ, tích hai ô, ghi lý do → duyệt hoàn và xác nhận.
3. **Người thứ ba:** chỉ ①②③; mở đơn 402 để giải thích vì sao hoàn tiền bị chặn và đóng yêu cầu phải chờ lượt người mua. Trả lời: “Nếu sai thì ai mất gì?”
4. **Cả nhóm:** nhận ca lạ từ người xem. Đòi số điện thoại thì từ chối; đòi khoá shop thì chuyển chuyên trách; không hiểu ca mới thì giữ mở và chuyển người.

**Sau demo mới điền:**

- Ca lạ thực tế nhận được: ____________________
- Giao diện đã xử lý thế nào: ____________________
- Nhóm có đổi thiết kế không, vì sao: ____________________

**Trước khi nộp:** điền thành viên và việc thực sự đã làm; bổ sung ý kiến về mức duyệt hoàn tiền, 1–2 ảnh và kết quả demo. Tạo repo GitHub **mới, công khai** tên `K5-L3A-Day05-T4-TMDT`, gồm file này và thư mục `prototype/`. Nộp link trước **23:59 ngày 12/11/2026, giờ Việt Nam**.
