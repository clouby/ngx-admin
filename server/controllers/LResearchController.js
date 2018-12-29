import {
  LineResearch,
  TrainingCenter
} from "./../models"
import fs from "fs";

exports.store = async (req, res, next) => {
  const l_reseach = await TrainingCenter.create(req.body)
  req.pre_response = {
    data: l_reseach,
    code: 201,
    field: 'name'
  }
  return next()
}

exports.all = async (req, res, _) => {
  const [LINE_RESEARCH, TRAINING_CENTER] = await Promise.all([LineResearch.find(), TrainingCenter.find()])
  return res
    .status(200)
    .json({
      LINE_RESEARCH,
      TRAINING_CENTER
    });
}
