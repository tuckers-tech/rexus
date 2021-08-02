# Dockerized Redis Tooling

## Install and Run locally

Run `git clone git@github.com:hawkeye2013/rexus.git`

`cd rexus`

`npm install`

`npm run dev`

## Running Via Docker

> Currently working through a websocket issue with docker

1. Clone the Repo
2. `docker build -t rexus .`
3. `docker run -p 4375:4375 -d hawkeye2013/rexus`
