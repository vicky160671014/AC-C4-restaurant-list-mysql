# 餐廳清單

## 介紹
可以收藏喜愛的餐廳，形成餐廳清單!

## 功能
-使用者可以註冊帳號，或透過Facebook登入建立帳號  
-使用者可以使用帳號密碼或Facebook登入系統  
-使用者登入後，可進行以下功能操作:  
  -使用者可以新增一家餐廳  
  -使用者可以瀏覽一家餐廳的詳細資訊  
  -使用者可以瀏覽全部所有餐廳  
  -使用者可以修改一家餐廳的資訊  
  -使用者可以刪除一家餐廳
  -使用者可以透過關鍵字搜尋餐廳資訊    


## 安裝與開始使用
1.確認已經安裝node.js以及npm  
2.將專案 git clone 到本地  
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
6.環境變數設定  
請參照跟目錄下的`.env.example`檔案，於跟目錄下新增`.env`檔案並進行設定:  
```bash
SESSION_SECRET=請自行設定
FACEBOOK_CLIENT_ID=請自行設定
FACEBOOK_CLIENT_SECRET=請自行設定
FACEBOOK_CALLBACK_URL=http://localhost:3000/oauth2/redirect/facebook
```
請自行設定SESSION_SECRET、FACEBOOK_CLIENT_ID、FACEBOOK_CLIENT_SECRET。  
若無FACEBOOK應用程式ClientId與secret，請先取得，否則無法使用Facebook登入功能。  
FACEBOOK_CALLBACK_URL建議依照`.env.example`預設值設定即可。  
7.專案安裝完畢、資料庫設置完成以及環境變數設定完畢後，繼續輸入啟動伺服器指令:  
啟動伺服器前，請先設置環境變數NODE_ENV=development  
```bash
npm run start
```
8.若於終端機看見以下訊息，則代表順利執行，打開網頁瀏覽器進入到以下網址，註冊登入後即可使用餐廳清單  
```bash
Express is running on http://localhost:3000/login
```
9.若要暫停使用，則在終端機輸入:
```bash
ctrl + c
```
10.若須載入種子資料，請輸入以下指令:
```bash
npm run seed
```
種子資料提供一組帳號密碼可使用:  
  -帳號：user1@example.com / 密碼：12345678
  -帳號: user2@example.com / 密碼：12345678

## 開發工具
-Node.js 14.16.0\
-express 4.18.2\
-express-handlebars 3.0.0\
-express-session:1.17.3\
-method-override: 3.0.0\
-mysql2: 3.2.0\
-sequelize: 6.30.0\
-sequelize-cli: 6.6.0\
-bootstrap 5.2.1\
-bcryptjs:2.4.3\
-connect-flash:0.1.1\
-dotenv:16.0.3\
-passport:0.6.0\
-passport-facebook:3.0.0\
-passport-local:1.0.0