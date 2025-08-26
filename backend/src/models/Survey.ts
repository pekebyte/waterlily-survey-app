import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SurveyAttributes {
  id: number;
  title: string;
  description: string;
  status: number; // 0 = inactive, 1 = active
  createdAt?: Date;
  updatedAt?: Date;
}

interface SurveyCreationAttributes extends Optional<SurveyAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Survey extends Model<SurveyAttributes, SurveyCreationAttributes> implements SurveyAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: number; // 0 = inactive, 1 = active
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Survey.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Default to inactive
    },
  },
  {
    sequelize,
    tableName: 'surveys',
  }
);

export default Survey;