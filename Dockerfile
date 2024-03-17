# build stage
#
#FROM --platform=linux/arm/v7 node:20-alpine as build-stage
# Do not specify platform
#FROM node:20-alpine as build-stage
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build

# production stage
FROM nginx:stable-alpine
WORKDIR /app
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#step 1: Tạo builder mới cho platform arm32: Chạy lệnh sau để tạo một builder mới cho platform arm32:
#--docker buildx create --name mybuilder --use
#step 2: kiểm tra và cấu hình Docker buildx builder để build các image đa nền tảng, sẽ tự động tải và cài đặt các công cụ cần thiết, bao gồm qemu-user-static, một bộ giả lập cho phép chạy các lệnh từ nền tảng không phải x86 trên nền tảng x86.
#Điều này cho phép bạn xây dựng image cho các kiến trúc khác nhau, chẳng hạn như ARMv7,
#trên một máy tính x86.
#--docker buildx inspect --bootstrap
#step final docker build
#--docker buildx build --platform linux/arm/v7 -t your_image_name:tag .