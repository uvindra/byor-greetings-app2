FROM node
WORKDIR /app
COPY . /app
RUN npm install
USER 10014
EXPOSE 9090
CMD ["node","app.js"]