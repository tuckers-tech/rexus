# Dockerized Redis Tooling That Doesn't Suck

## Running

1. Clone the Repo
2. `docker build -t rexus .`
3. `docker run -p 4375:4375 -d rexus`

## Environment Variables

`REXUS_APPLICATION_URL` - Location to the application root url.
