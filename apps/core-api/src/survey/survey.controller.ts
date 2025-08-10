import {
  Controller,
  Get,
  Query,
  Param,
  Patch,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyDto } from './dto/survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  create() {
    return this.surveyService.create();
  }

  @Get(':id')
  fundOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.surveyService.delete(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() surveyDto: SurveyDto) {
    return this.surveyService.update(id, surveyDto);
  }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const list = await this.surveyService.findAll({ keyword, page, pageSize });
    const count = await this.surveyService.countAll({ keyword });

    return { list, count };
  }
}
