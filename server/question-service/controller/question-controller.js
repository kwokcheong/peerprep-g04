import { ormFindAllQuestions as _findAllQuestions } from "../model/question-orm.js";
import { ormCreateQuestion as _createQuestion } from "../model/question-orm.js";
import { ormDeleteQuestion as _deleteQuestion } from "../model/question-orm.js";

export async function getQuestions(req, res) {
  const response = await _findAllQuestions();

  if (response === null) {
    return res.status(404).json({ message: `No questions exist!` });
  } else if (response.err) {
    return res.status(400).json({ message: "Could not find questions!" });
  } else {
    return res.status(200).json({
      data: response,
    });
  }
}

export async function createQuestion(req, res) {
  try {
    const { title, description, category, complexity } = req.body;
    if (title && description && category && complexity) {
      const resp = await _createQuestion(
        title,
        description,
        category,
        complexity
      );

      if (resp.err) {
        return res.status(409).json({
          message:
            "Could not create a new question! (Possibly question Already Exists!)",
        });
      } else {
        console.log(`Created new question ${title} successfully!`);
        return res
          .status(201)
          .json({ message: `Created new question ${title} successfully!` });
      }
    } else {
      return res.status(400).json({
        message: "Some info is missing!",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when creating new question!" });
  }
}

export async function updateQuestion(req, res) {}

export async function deleteQuestion(req, res) {
  try {
    const { _id } = req.body;
    if (_id) {
      console.log(`DELETE QUESTION: ID Obtained: ${_id}`);
      const response = await _deleteQuestion(_id);
      if (response.err) {
        return res
          .status(400)
          .json({ message: "Could not delete the question!" });
      } else if (!response) {
        return res
          .status(404)
          .json({ message: `Question with ${_id} not found!` });
      } else {
        return res
          .status(200)
          .json({ message: `Deleted question ${_id} successfully!` });
      }
    } else {
      return res.status(400).json({
        message: "Id is missing!",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when deleting question!" });
  }
}
