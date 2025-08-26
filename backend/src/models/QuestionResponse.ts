import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Question from './Question';
import SurveyResponse from './SurveyResponse';

interface QuestionResponseAttributes {
  id: number;
  responseId: number;
  questionId: number;
  answer: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface QuestionResponseCreationAttributes extends Optional<QuestionResponseAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class QuestionResponse extends Model<QuestionResponseAttributes, QuestionResponseCreationAttributes> implements QuestionResponseAttributes {
  public id!: number;
  public responseId!: number;
  public questionId!: number;
  public answer!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuestionResponse.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    responseId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: SurveyResponse,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    questionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Question,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'question_responses',
  }
);

export default QuestionResponse;