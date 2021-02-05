FROM nginx
COPY www /var/www
COPY config/nginx.production.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443