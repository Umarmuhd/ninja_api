import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  //GET /ninjas?rank=senior - display all ninjas
  @Get()
  getNinjas(@Query('rank') rank: string) {
    console.log(rank);
    return this.ninjasService.getNinjas(rank as 'black-belt' | 'orange-belt');
  }
  //GET /ninjas/:id - display a specific ninja
  @Get('/:id')
  getNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
  //POST /ninjas - add a ninja
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    console.log(createNinjaDto);
    return this.ninjasService.createNinja(createNinjaDto);
  }
  //PUT /ninjas/:id - update a ninja
  @Put('/:id')
  @UseGuards(BeltGuard)
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }
  //DELETE /ninjas/:id - delete a ninja
  @Delete('/:id')
  @UseGuards(BeltGuard)
  removeNinja(@Param('id') id: string) {
    return this.ninjasService.deleteNinja(+id);
  }
}
