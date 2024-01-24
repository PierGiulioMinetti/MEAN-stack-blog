function authCheck(req, res, next) {
  let token = [];
  console.log('--------------------------------------------');
  const authHeader = req.headers['authorization'];

  if(authHeader){
    // token = authHeader.split[' '];
    const splitResult = authHeader.split(" ");
   token = splitResult[1];
    console.log('authHeader ------->', authHeader);
  } else {
    token = null;
  }

  console.log('--------------------------------------------');
  console.log('token', token);
  console.log('--------------------------------------------');

  console.log('log HEADERS:', req.headers);
  console.log('--------------------------------------------');
  next();
}

module.exports = { authCheck }
