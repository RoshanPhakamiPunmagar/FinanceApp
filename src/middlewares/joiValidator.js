import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
  cpassword: Joi.string(),
});

const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
});

const createTransactionSchema = Joi.object({
  date: Joi.date().required(),
  amount: Joi.number().required(),
  description: Joi.string(),
  type: Joi.string().required().allow("income", "expense"),
});

export const crateUserValidator = (req, res, next) => {
  try {
    let { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        status: "error",
        from: "validation",
        message: error.message,
      });
    }
    // if everything goes right
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({
      status: "error",
      from: "validation",
      message: error.message,
    });
  }
};

export const loginUserValidator = (req, res, next) => {
  try {
    let { error, value } = loginUserSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        status: "error",
        from: "validation",
        message: error.message,
      });
    }
    // if everything goes right
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({
      status: "error",
      from: "validation",
      message: error.message,
    });
  }
};

export const createTransactionValidator = (req, res, next) => {
  try {
    let { error, value } = createTransactionSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        status: "error",
        from: "validation",
        message: error.message,
      });
    }
    // if everything goes right
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({
      status: "error",
      from: "validation",
      message: error.message,
    });
  }
};
