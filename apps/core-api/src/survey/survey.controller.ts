import { Controller, Get, Query, Param, Patch, Body } from '@nestjs/common';
import { SurveyDto } from './dto/survey.dto';

@Controller('survey')
export class SurveyController {
  @Get()
  findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    console.log(keyword, page, pageSize);
    return keyword + page + pageSize;
  }

  @Get(':id')
  fundOne(@Param('id') id: string) {
    return {
      id,
      title: 'test',
      desc: '',
    };
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() surveyDto: SurveyDto) {
    console.log('surveyDto', surveyDto);
    return {
      id,
      title: 'test',
      desc: '',
    };
  }
}
