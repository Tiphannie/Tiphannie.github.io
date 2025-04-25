# Setting Up a Dockerized Express App with NGINX Proxy

This project is a basic Express.js app set up inside a Docker container, complete with an NGINX reverse proxy using Docker Compose. It's based on the `sample-express` and `sample-docker` examples from the [WT1 Lab 02 instructions](https://github.com/htw-imi-wt1/lab-02-express-docker).

---

## 📦 1. Initialize the Express App

### a. Set up a Node.js project

```bash
npm init -y
```

### b. Install Express

```bash
npm install express
```

### c. Create `.gitignore`

```bash
echo "node_modules/" >> .gitignore
```

### d. Create `index.js`

Example contents (from the course repo, modified slightly):

```js
const express = require("express");
const server = express();
const port = 3002;

server.get("/hello", (req, res) => {
  res.send("Hello from Express!");
});

server.listen(port, () => {
  console.log("Express listening on " + port);
});
```
### e. Run the App
Start the server using:
```bash
node index.js
```

### Access at: http://localhost:3002/hello
---

## 🐳 2. Run the App with Docker 

Download and install Docker Desktop:
[Docker Installation Guide](https://docs.docker.com/desktop/)


### a. Dockerfile

Create a `Dockerfile` in the root of your project:

```Dockerfile
FROM node:current
WORKDIR /home/node
COPY package.json package-lock.json /home/node/
RUN npm install
COPY . .
EXPOSE 3002
CMD ["npm", "start"]
```

### b. Build Docker Image

```bash
docker build -t wt1-express-local .
```

For clarity, list availble Docker images with 
```
docker image ls
```

### c. Run Container

```bash
docker run --name myapp-application-1 -p 3002:3002 -v $(pwd):/home/node/ wt1-express-local
```

Visit: [http://localhost:3002](http://localhost:3002)

---

## 🧱 3. Run with Docker Compose + NGINX

### a. `compose.yml`

You’ll use the Docker Compose file like given. 

---

## 🌐 4. Serve Static Files with NGINX

### a. Create `public_html`

```bash
mkdir public_html
```
Put a static file you want to serve in here e.g. index.html 

### b. Update `default.conf.template`

In `nginx/templates/default.conf.template`, make sure the server block includes:

```nginx
location /doc/ {
    alias /usr/share/nginx/html/;
    index index.html;
}
```

This lets NGINX serve files from the `public_html` folder at `http://localhost/doc`.

---

## 🚀 5. Start It All Up

Use Docker Compose to start the services:

```bash
docker compose up --build
```

---

## 💡 Notes

- The Express app runs on port 3002 inside the container.
- NGINX listens on port 80 and forwards requests to Express.
- Static files live in `public_html/` and are served via `/doc`.

---

## Based On

This setup is based on the `sample-express` and `sample-docker` directories from:

🔗 [WT1 Lab 02 – Express + Docker](https://github.com/htw-imi-wt1/lab-02-express-docker)
