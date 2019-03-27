# igdb-js-proxy

Test queries to **IGDB API v3** with JavaScript, axios, and a proxy.

---
### Requirements
* IGDB API v3 key ([It's free!](https://api.igdb.com/signup))
* Node.js and npm ([Install](https://www.npmjs.com/get-npm))
* http-server ([Github](https://github.com/indexzero/http-server))

---
### Set up
1. At the top of `main.js`, paste in your API key

In a terminal window...

2. Install `http-server` globally:
```bash
$ npm install -g http-server
```
3. Go to the `igdb-js-proxy` directory
4. Start `http-server` with proxy:
```bash
$ http-server -o -s -a localhost --port 8080 --proxy https://api-v3.igdb.com
```
This should open a browser window and you're ready to start making your queries.

---
### Resources
* [IGDB API v3 documentation](https://api-docs.igdb.com/)
* [IGDB Discord channel](https://discord.gg/WvBNFRu)
* [IGDB.com](IGDB.com)
* [axios](https://github.com/axios/axios)

---
### Related
[vue-igdb-api-v3](https://github.com/evild70/vue-igdb-api-v3)
