FROM ruby:2.4.4-slim

ENV LANG C.UTF-8

# Install dependencies/logic taken from
# https://github.com/beefproject/beef/blob/master/install

ENV DEPS \
dpkg curl git build-essential openssl libreadline6-dev zlib1g zlib1g-dev \
libssl-dev libyaml-dev libsqlite3-0 libsqlite3-dev \
sqlite3 libxml2-dev libxslt1-dev autoconf libc6-dev \
libncurses5-dev automake libtool bison nodejs

RUN apt-get update \
&& apt-get install -y $DEPS \
&& apt-get upgrade -y \
&& useradd -m beef

RUN git clone --depth=1 \
--branch=master \
https://github.com/beefproject/beef.git /home/beef/beef

WORKDIR /home/beef/beef
# Overwrite Gemfile due to Ruby 2.4 additions
COPY Gemfile Gemfile
COPY config.yaml config.yaml
RUN chown -R beef .

RUN bundle install --without test development \
&& rm -rf /home/beef/beef/.git \
&& rm -rf /var/lib/apt/lists/*

# VOLUME /home/beef/.beef

USER beef

EXPOSE 3000 6789 61985 61986

ENTRYPOINT ["./beef"]
