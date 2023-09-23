FROM nginx
WORKDIR /usr/share/nginx/html
COPY web .
# Docker does not copy symlinks
COPY libs ./libs
EXPOSE 8080

