import { ApiProperty } from '@nestjs/swagger';

const niceTimestamp = () => Math.floor(Date.now() / 1000);

export class Step {
  @ApiProperty({
    example: niceTimestamp(),
    description: 'The start of the steps (timestamp)',
  })
  start: number;

  @ApiProperty({
    example: 12,
    description: 'The number of steps taken in the timeframe',
  })
  stepsAmount: number;

  @ApiProperty({
    example: niceTimestamp(),
    description: 'The end of the steps (timestamp)',
  })
  end: number;
}
