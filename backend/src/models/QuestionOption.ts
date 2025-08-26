import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Question from "./Question";

interface QuestionOptionAttributes {
  id: number;
  questionId: number;
  text: string;
  value: string;
  order: number; // Only for multiple-choice and checkbox types
  createdAt?: Date;
  updatedAt?: Date;
}

interface QuestionOptionCreationAttributes extends Optional<QuestionOptionAttributes, "id" | "createdAt" | "updatedAt"> {}

class QuestionOption extends Model<QuestionOptionAttributes, QuestionOptionCreationAttributes> implements QuestionOptionAttributes {
  public id!: number;
  public questionId!: number;
  public text!: string;
  public value!: string;
  public order!: number; // Only for multiple-choice and checkbox types
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuestionOption.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    questionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Question,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "question_options",
  }
);

export default QuestionOption;