import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StepsInMemoryService } from 'src/shared/storages/in-memory/steps.in-memory.service';
import { AuthGuard } from './dto/auth.guard';
import { CreateStepsDTO } from './dto/create-steps.dto';
import { SummaryDTO } from './dto/summary.dto';
import { Step } from './entities/step.entity';
import { Summary } from './entities/summary.entity';
import { sameDay } from './steps.utils'

@Controller('steps')
export class StepsController {
  constructor(private storage: StepsInMemoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  saveSteps(
    @Body() createStepsDTO: CreateStepsDTO,
    @Headers('x-user-id') userId: string,
  ): Step[] {
    const { steps } = createStepsDTO;

    return this.storage.add(userId, steps);
  }

  @Get('/summary')
  @UsePipes(ValidationPipe)
  findAll(@Query() query: SummaryDTO): Summary {
    const records = this.storage.findAll();
    const steps = records.reduce((prev, current) => prev.concat(current), []);
    const startDateTimestamp = new Date(query.date).getTime() / 1000;

    return steps.reduce((prev, current) => {
      if(sameDay(startDateTimestamp, current.start)) {
        prev.total += current.stepsAmount;
      }

      return prev;
    }, {date: query.date, total: 0});
  }
}
