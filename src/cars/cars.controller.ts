import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    // por defecto, cualquier parámetro que se obtenga por el url va a ser un string
    @Get(':id')
    getCarById(@Param('id', ParseUUIDPipe) id: string) {
        // + o Number(id)
        // pipe: transforma la data recibida en requests, para asegurar un tipo, valor o instancia de un objeto
        // usar pipe
        return this.carsService.findOne(id);
    }

    // los pipes se pueden colocar en:
    // parametros / controlador / global de controlador / global de aplicación
    @Post()
    // @UsePipes(ValidationPipe)
    createCar(@Body() createCarDto: CreateCarDto) {
        return this.carsService.create(createCarDto);
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto) {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.delete(id);
    }
}
