FROM terragontech/node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN chmod +x /usr/src/app/run.sh
RUN npm cache clean --force && npm install
CMD ./run.sh