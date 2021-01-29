FROM nginx
COPY www /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443