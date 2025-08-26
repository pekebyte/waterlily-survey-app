import sequelize from "../config/database";
import User from "./User";
import Survey from "./Survey";
import Question from "./Question";
import SurveyResponse from "./SurveyResponse";
import QuestionResponse from "./QuestionResponse";
import QuestionOption from "./QuestionOption";

// Define relationships
User.hasMany(SurveyResponse, { foreignKey: "userId", as: "responses" });
SurveyResponse.belongsTo(User, { foreignKey: "userId", as: "user" });

Survey.hasMany(Question, { foreignKey: "surveyId", as: "questions" });
Question.belongsTo(Survey, { foreignKey: "surveyId", as: "survey" });

Question.hasMany(QuestionOption, { foreignKey: "questionId", as: "options" });
QuestionOption.belongsTo(Question, { foreignKey: "questionId", as: "question" });

Survey.hasMany(SurveyResponse, { foreignKey: "surveyId", as: "responses" });
SurveyResponse.belongsTo(Survey, { foreignKey: "surveyId", as: "survey" });

SurveyResponse.hasMany(QuestionResponse, { foreignKey: "responseId", as: "questionResponses" });
QuestionResponse.belongsTo(SurveyResponse, { foreignKey: "responseId", as: "response" });

Question.hasMany(QuestionResponse, { foreignKey: "questionId", as: "responses" });
QuestionResponse.belongsTo(Question, { foreignKey: "questionId", as: "question" });

export { sequelize, User, Survey, Question, QuestionOption, SurveyResponse, QuestionResponse };