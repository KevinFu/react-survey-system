import {
  Controller,
  Get,
  Query,
  Param,
  Patch,
  Body,
  Delete,
  Post,
  Request,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyDto } from './dto/survey.dto';

interface RequestUser {
  username: string;
}

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  create(@Request() req: Request & { user: RequestUser }) {
    const { username } = req.user;
    return this.surveyService.create(username);
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
