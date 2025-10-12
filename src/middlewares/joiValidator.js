import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .required(),
  password: Joi.string().required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .required(),
  password: Joi.string().required(),
});

export const createUserValidator = (req, res, next) => {
  try {
    let { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        status: "error",
        from: "validation",
        message: error.message,
      });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({
      status: "error",
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
        message: error.message,
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};
