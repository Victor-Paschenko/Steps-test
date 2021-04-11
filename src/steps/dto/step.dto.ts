import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { IsBiggerThan } from './validators/is-bigger-than';

export class StepDTO {
  @IsNotEmpty()
  @IsInt()
  start: number;

  @IsNotEmpty()
  @IsInt()
  @IsBiggerThan('start', {
    message: 'End cannot be smaller than or equal to start.',
  })
  end: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stepsAmount: number;
}
