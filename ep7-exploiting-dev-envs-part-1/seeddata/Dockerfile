FROM centos:7
# Seed data for the PROD ES Instance

WORKDIR /home
COPY seed.sh seed.sh
RUN chmod +x seed.sh

ENTRYPOINT ["./seed.sh"]
