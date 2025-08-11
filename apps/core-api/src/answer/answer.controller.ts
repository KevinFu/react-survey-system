import { Body, Controller, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { AnswerDto } from './dto/answer.dto';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Public()
  @Post()
  create(@Body() body: AnswerDto) {
    return this.answerService.create(body);
  }
}
