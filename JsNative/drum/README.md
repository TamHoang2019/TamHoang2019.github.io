# javascript30days
# 01. Make a JavaScript Drum Kit in Vanilla JS!
## CSS
 - Sử dụng flex cho div cha div.keys, căn giữa các element bên trong theo chiều ngang-chiều dọc.
 - Sử dụng background cho html.
 - Tạo root font-size tức là css font-size cho thẻ body theo đơn vị pixel: 10pixel.
 => 1 rem = 10pixel. 
 => các đơn vị tính trở về sau sẽ sử dụng theo rem.
## JS
- Cho object window lắng nghe sự kiện nhấn phím (keydown), lấy được keyCode thông qua tham số event.
- Truyền event này vào function callback xử lý các tác vụ:
 - Sử dụng querySelector để lấy ra DOM audio có thuộc tính [data-key=event.keyCode].
 - Sử dụng template string: audio[`data-key="${event.keyCode}"`] 
 - Nếu DOM lấy ra là có (vì có khả năng ngừoi dùng nhấn các phím ngoài dãy phím A S D F G H J K L), thì gọi method play cho DOM vừa lấy ra được: audio.play()
### Xử lý trường hợp 01
 User nhấn liên tục 1 phím, theo đúng trải nghiệm thì phải play lại audio đó, chứ không đợi cho audio trước chạy xong thì mới play audio vừa mới nhấn sau đó.
 + Trước khi gọi method audio.play(), ta set property audio.currentTime = 0
 + Property currentTime của 1 object audio hoặc video sẽ giúp lấy ra hoặc cài đặt vào thời điểm (theo giây) chạy của audio hoặc video đó. (xem thêm: https://www.w3schools.com/tags/av_prop_currenttime.asp)

### Làm thế nào để thay đổi hiển thị ô chứa ký tự khi user nhấn vào ký tự tương ứng?
vd: User nhấn vào phím A, ngoài việc phát ra âm thanh clap, còn làm cho ô chứa ký tự A sáng lên, to ra. 
1. Tạo css cho class .playing: ví dụ tăng kích thước lên 1.5...
2. Dựa vào e.keyCode => querySelector ra được DOM của ký tự tương ứng: `.key[data-key="${e.keyCode}"]`
3. Sử dụng method key.classList.add("playing") thêm class cho key nhằm thay đổi css của ô chứa key đó.

### Làm thế nào để remove class playing cho các div.key đã được add class playing trước đó?
vd: Sau khi User nhấn vào phím A, phát ra âm thanh, và đã hiển thị to lên, sáng ra rồi, thì sau 1 khoảng thời gian ô chứa ký A trở về trạng thái bình thường. <br>
Trước tiên, tìm hiểu về thuộc tính transition trong css, thuộc tính giúp cho sự thay đổi css áp dụng lên 1 dom nào đó, được diễn ra trong 1 khoảng thời gian, chứ ko phải ngay lập tức. 
Trong dự án này, transition được cài đặt với thời gian là 0.07s.
Vậy, ta sẽ dựa vào khoảng thời gian này để làm cho ô chứa ký tự biến mất hiệu ứng playing. 
Nghĩa là:
+ Lắng nghe sự kiện kết thúc transition ở các DOM có class là key. Trình duyệt có cung cấp sẵn sự kiện transitionend (xem thêm: https://www.w3schools.com/jsref/event_transitionend.asp)
+ Tạo hàm callback thực hiện việc remove class playing. 
+ Điều kiện để remove class playing: dựa vào propertyName của event transitionend. 
 + Nếu ko có value transform -> thì return
 + Nếu có value transform -> remove class playing. (nghĩa là đã hoàn thành hiệu ứng playing)
