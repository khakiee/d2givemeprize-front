![GitHub last commit](https://img.shields.io/github/last-commit/veatoriche/D2stagram)
# D2stagram

Social network service with Vue cli 3 😇

backend Server -> https://github.com/9oominsoo/d2givemeprize-backend

visit http://d2snsfront.ap-northeast-2.elasticbeanstalk.com/

## 🚪 Introduction

This repository is for example for vue cli 3 frontend for SNS 

## Getting Started

This instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 🔨 Project setup

1. install dependency with `npm install`
2. set `static/settings_local.js` with your aws informations
3. run server with `npm run serve`

### 🔧 Compiles and hot-reloads for development
```
npm run serve
```

### 🖥 Compiles and minifies for production
```
npm run build
```

### 📝 Check Lints
```
lint : npm run lint
```

### 🐋 Dockerfile usage
```
cd d2givemeprize-frontend/
docker build -t d2givemeprize-frontend/{image-name}:{tag-name} .
docker run -d -p 8080:3000 {image-name}/{tag-name}
```

## 🧱Built With
* filepond : [https://github.com/pqina/filepond](https://github.com/pqina/filepond)
* vue : [https://github.com/vuejs/vue](https://github.com/vuejs/vue)
* vue-router : [https://github.com/vuejs/vue-router](https://github.com/vuejs/vue-router)
* vuex : [https://github.com/vuejs/vuex](https://github.com/vuejs/vuex)
* vue-cli : [https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)
* vue-devtools : [https://github.com/vuejs/vue-devtools](https://github.com/vuejs/vue-devtools)
* bootstrap : [https://github.com/twbs/bootstrap](https://github.com/twbs/bootstrap)
* popper.js : [https://github.com/FezVrasta/popper.js/](https://github.com/FezVrasta/popper.js/)
* axios : [https://github.com/axios/axios](https://github.com/axios/axios)
* vuex-localstorage : [https://github.com/crossjs/vuex-localstorage](https://github.com/crossjs/vuex-localstorage)
* vuex-persistedstate : [https://github.com/robinvdvleuten/vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)
* eslint : [https://github.com/eslint/eslint](https://github.com/eslint/eslint)
* aws-sdk : [https://github.com/aws/aws-sdk-js](https://github.com/aws/aws-sdk-js)

## License
This project is licensed under the MIT License -> check out the [LICENSE](https://github.com/veatoriche/d2givemeprize-frontend/blob/master/LICENSE)

