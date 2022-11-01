FROM node
WORKDIR /app
COPY ${pwd}/byoc-test /app
RUN ls
RUN npm install
USER 10014
EXPOSE 9090
CMD ["node","app.js"]
