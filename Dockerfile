FROM node:23

USER node
WORKDIR /home/node/app

RUN mkdir node_modules

CMD ["/bin/bash", "-c", "cd app"]

# CMD ["/bin/bash", "-c", "cd app && yarn install && yarn dev"]