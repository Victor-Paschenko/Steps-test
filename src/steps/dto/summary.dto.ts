import { IsNotEmpty, IsDateString, Length } from 'class-validator';

export class SummaryDTO {
  @IsNotEmpty()
  @IsDateString()
  @Length(8, 10, {
    message: 'Please enter full date',
  })
  date: string;
}
