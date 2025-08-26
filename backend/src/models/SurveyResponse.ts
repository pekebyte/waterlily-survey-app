import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Survey from "./Survey";
import User from "./User";

interface SurveyResponseAttributes {
  id: number;
  surveyId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SurveyResponseCreationAttributes extends Optional<SurveyResponseAttributes, "id" | "createdAt" | "updatedAt"> {}

class SurveyResponse extends Model<SurveyResponseAttributes, SurveyResponseCreationAttributes> implements SurveyResponseAttributes {
  public id!: number;
  public surveyId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SurveyResponse.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    surveyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Survey,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "survey_responses",
  }
);

export default SurveyResponse;