const handlePsqlError = (err, req, res, next) => {
  const psqlErrors = {
    "22023": { status: 400, msg: "Bad Request" },
    "22007": { status: 400, msg: "Bad Request" },
    "22008": { status: 400, msg: "Bad Request - It needs a valid time" }
  };
  if (psqlErrors[err.code]) {
    res
      .status(psqlErrors[err.code].status)
      .send({ msg: psqlErrors[err.code].msg });
  } else {
    next(err);
  }
};

const handleCustomError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const routeNotFound = (req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
};

const methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

const handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = {
  handlePsqlError,
  handleCustomError,
  routeNotFound,
  methodNotAllowed,
  handle500
};
