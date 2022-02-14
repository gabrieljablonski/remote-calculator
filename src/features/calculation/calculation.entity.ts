/* eslint-disable no-shadow */
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

enum CalculationError {
  DIVIDE_BY_ZERO = 'DIVIDE_BY_ZERO',
}

enum OperationType {
  SUM = 'SUM',
  SUBTRACT = 'SUBTRACT',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
}

export { CalculationError, OperationType };

@Entity()
export default class Calculation {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column({ nullable: false })
  args!: number[];

  @Column({ enum: OperationType, nullable: false })
  operation!: string;

  @Column({ nullable: true })
  result!: number;

  @Column({ enum: CalculationError, nullable: true })
  error!: string;
}
