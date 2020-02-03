# javascript30days
# 02. We build a CSS + JS Clock in Vanilla JS
**Làm thế nào tạo ra đồng hồ bao gồm: ?**
- 12 con số trên mặt đồng hồ.
- Tâm đồng hồ.
- Các kim giây, giờ, phút chuyển động theo đúng giờ hiện tại của máy tính.

### Các kiến thức về CSS được sử dụng:
- khai báo và sử dụng biến trong CSS.
- dùng từ khoá calc để tính toán gía trị.
- Thuộc tính background: 
 + linear-gradient(hsl)
- Thuộc tính transform kết hợp transform-origin
 + translateX
 + rotate
- Thuộc tính position 
- Thuộc tính z-index

### Javascript:
- Sử dụng hàm setInterval
- Sử dụng object Date, và các phương thức getSeconds, getMinutes, getHours
- Cách tính độ(deg) dùng để quay các cây kim trên mặt đồng hồ:

Cứ 1 giây thì hàm setClock chạy 1 lân. 
Nội dung hàm setClock:
+ lấy giờ hiện tại của hệ thống máy tính: currentDate 
+ lấy số giây = currentDate.getSeconds() 
+ lấy tỉ lệ giây = secondsRatio = currentDate.getSeconds()/ 60
+ từ tỉ lệ giây * 360 => được góc quay của kim giây, vào thời điểm hiện tại.
+ góc quay kim giây hiện tại = giây hiện tại / 60 * 360
+ lấy phút hiện tại = currentDate.getMinutes() 
+ lấy tỉ lệ phút = (tỉ lệ giây + phút hiện tại) / 60
+ góc quay kim phút hiện tại = tỉ lệ phút * 360
