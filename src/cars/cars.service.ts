import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
// yarn add -D (-D es dependencia de desarrollo, los types no aplican para prod)
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto/index';

// service: aloja la lógica de negocio de tal manera que sea reutilizable mediante inyección de dependencias
// todos los services son providers, no todos los providers son services

@Injectable()
export class CarsService {
    private cars: Car[] = [];

    create(createCarDto: CreateCarDto) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(newCar);
        return newCar;
    }

    findAll() {
        return this.cars;
    }

    // exception filters: manejan los errores de código en mensajes de respuesta http
    findOne(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car)
            throw new NotFoundException(`Car with id: ${id} not found`);
        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findOne(id);
        if (updateCarDto.id && updateCarDto.id === id)
            throw new BadRequestException('Car id is not valid inside body');
        this.cars = this.cars.map(car => {
            // si el id enviado al update existe en el arreglo
            if (car.id === id) {
                // colocarle las propiedades (sobreescritura) al carDB de:
                // cardDB (existente)
                // updateCarDto (update)
                // id (para evitar modificar el id)
                carDB = { ...carDB, ...updateCarDto, id }
                return carDB;
            }
            return car;
        });
        return carDB;
    }

    delete(id: string) {
        let car = this.findOne(id);
        this.cars = this.cars.filter(car => car.id !== id);
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }
}
