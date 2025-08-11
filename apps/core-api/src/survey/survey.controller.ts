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
import { DeleteResult } from 'mongoose';

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
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Delete(':id')
  deleteOne(
    @Param('id') id: string,
    @Request() req: Request & { user: RequestUser },
  ) {
    const { username } = req.user;
    return this.surveyService.delete(id, username);
  }

  @Delete()
  deleteMany(
    @Body() body: { ids: string[] },
    @Request() req: Request & { user: RequestUser },
  ): Promise<DeleteResult> {
    const { username } = req.user;
    const { ids = [] } = body;
    return this.surveyService.deleteMany(ids, username);
  }

  @Post('duplicate/:id')
  duplicate(
    @Param('id') id: string,
    @Request() req: Request & { user: RequestUser },
  ) {
    const { username } = req.user;
    return this.surveyService.duplicate(id, username);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() surveyDto: SurveyDto,
    @Request() req: Request & { user: RequestUser },
  ) {
    const { username } = req.user;
    return this.surveyService.update(id, surveyDto, username);
  }

  @Get()
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('isDeleted') isDeleted: boolean = false,
    @Query('isStar') isStar: boolean = false,
    @Request() req: Request & { user: RequestUser },
  ) {
    const { username } = req.user;

    const list = await this.surveyService.findAll({
      keyword,
      page,
      pageSize,
      isDeleted,
      isStar,
      author: username,
    });

    const count = await this.surveyService.countAll({
      keyword,
      author: username,
      isDeleted,
      isStar,
    });

    return {
      list,
      count,
    };
  }
}
