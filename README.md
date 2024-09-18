# [Tic-Tac-Toe](https://tic-tac-toe-minglin1995s-projects.vercel.app/)

### 本地開發：可連接 Vercel 自動部屬

```
npm install
npm start
```

### 可連接 Zeabur 透過 Dockerfile 自動部屬 （但免費方案不支援可能隨時會被中止）

```
docker build -t tic-tac-toe .
docker run -p 3000:3000 tic-tac-toe
```

### node 版本太舊跑不起來的話可以用 nvm

1. 安裝 nvm

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

2. 重啟終端機
3. 查看可用版本

```
nvm ls-remote
```

4. 安裝 node (最新的 LTS 版本)

```
nvm install --lts
```

5. 使用剛剛安裝的版本

```
nvm use --lts
```

6. 確認版本

```
node -v
```
