import { Injectable } from '@nestjs/common';
import { Step } from 'src/steps/entities/step.entity';
import { InMemoryStorage } from './in-memory-storage.service';

@Injectable()
export class StepsInMemoryService extends InMemoryStorage<Step[]> {
  modelName = 'Steps';

  constructor() {
    super();
    this.createStore();
  }
}
