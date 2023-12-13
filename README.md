# 餐廳清單

## 介紹
可以收藏喜愛的餐廳，形成餐廳清單!

## 功能
<ul>
<li>使用者可以新增一家餐廳</li>
<li>使用者可以瀏覽一家餐廳的詳細資訊</li>
<li>使用者可以瀏覽全部所有餐廳</li>
<li>使用者可以修改一家餐廳的資訊</li>
<li>使用者可以刪除一家餐廳</li>
</ul>

## 安裝與開始使用
1.確認已經安裝node.js以及npm\
2.將專案 git clone 到本地\
3.透過終端機進入專案資料夾，輸入:
```bash
npm install
```
4.使用MySQL server，建立資料庫:
``` bash
CREATE DATABASE `restaurant`
```
5.於終端機透過sequelize-cli執行migration，建立資料表:
```bash
npx sequelize db:migrate
```
6.專案安裝完畢以及資料庫設置完成後，繼續輸入:
```bash
npm run start
```
7.若看見以下訊息，則代表順利執行，打開網頁瀏覽器進入到以下網址
```bash
Express is running on http://localhost:3000/restaurants
```
8.若要暫停使用，則在終端機輸入:
```bash
ctrl + c
```
9.若須載入種子資料，請輸入以下指令:
```bash
npm run seed
```

## 開發工具
-Node.js 14.16.0\
-express 4.18.2\
-express-handlebars 3.0.0\
-method-override: 3.0.0\
-mysql2: 3.2.0\
-sequelize: 6.30.0\
-sequelize-cli: 6.6.0\
-bootstrap 5.2.1\