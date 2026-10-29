
const Users = require('../users/users-model');

// 1. Tüm istekleri konsola yazdırır
function logger(req, res, next) {
  const timestamp = new Date().toISOString();

  console.log(
    `${req.method} ${req.originalUrl} ${timestamp}`
  );

  next();
}

// 2. Kullanıcı ID'sini doğrular
async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);

    if (!user) {
      return res.status(404).json({
        mesaj: 'kullanıcı bulunamadı',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// 3. Kullanıcı name alanını doğrular
function validateUser(req, res, next) {
  if (
    typeof req.body?.name !== 'string' ||
    !req.body.name.trim()
  ) {
    return res.status(400).json({
      mesaj: 'gerekli name alanı eksik',
    });
  }

  next();
}

// 4. Post text alanını doğrular
function validatePost(req, res, next) {
  if (
    typeof req.body?.text !== 'string' ||
    !req.body.text.trim()
  ) {
    return res.status(400).json({
      mesaj: 'gerekli text alanı eksik',
    });
  }

  next();
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
