FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD none  
ENV MYSQL_DATABASE translated 
ENV MYSQL_USER users_service  
ENV MYSQL_PASSWORD 123

ADD schema.sql /docker-entrypoint-initdb.d