# ---- Static CV served by nginx ----
FROM nginx:1.27-alpine

COPY index.html  /usr/share/nginx/html/index.html
COPY styles.css  /usr/share/nginx/html/styles.css
COPY assets/     /usr/share/nginx/html/assets/

EXPOSE 80

# nginx:alpine already runs `nginx -g 'daemon off;'` as CMD
