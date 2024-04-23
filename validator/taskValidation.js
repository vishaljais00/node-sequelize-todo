const {body, check, validationResult, param, query } = require("express-validator");
const taskValidationRules = (params) => {
  switch (params) {
    case "add_todo":
      return [
        check("task").notEmpty().withMessage('please enter task'),
        check("due_date").notEmpty().withMessage('due date is empty'),
        check("priority",).notEmpty().withMessage('pripority missing'),
      ];

    case "update_todo":
      return [
        check("todo_id")
          .notEmpty()
          .withMessage("please send task id")
          .isNumeric()
          .withMessage("please send a valid task id"),
      ];

      case "delete_todo":
        return [query("id").notEmpty().withMessage("no id provided").isNumeric().withMessage('id should be numeric')];

      case "get_single_todo":
      return [param("id").notEmpty().withMessage("no id provided").isNumeric().withMessage('id should be numeric')];

    default:
      return [];
  }
};


const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => {
    console.log("err", err)
    extractedErrors.push({ [err.path]: err.msg })
  });
  // await req.config.sequelize.close();
  return res.status(400).json({
    status: 422,
    message: "please fill the mandatory fields",
    data: extractedErrors,
  });
};



module.exports = {
  taskValidationRules,
  validate
};
