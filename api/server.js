
const express = require('express');

const usersRouter = require('./users/users-router');

const { logger } = require('./middleware/middleware');

const server = express();

// Gelen JSON verilerini ayrıştır
server.use(express.json());

// Bütün API isteklerini logla
server.use(logger);

// Kullanıcı endpointleri
server.use('/api/users', usersRouter);

// Bulunamayan endpointler
server.use((req, res) => {
  res.status(404).json({
    mesaj: 'endpoint bulunamadı',
  });
});

// Genel hata yakalama middleware'i
server.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    mesaj: 'sunucu hatası',
  });
});

module.exports = server;
