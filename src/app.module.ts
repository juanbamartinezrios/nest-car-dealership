import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { BrandsModule } from './brands/brands.module';
import { SeedModule } from './seed/seed.module';

// module: agrupan y desacoplan un conjunto de funcionalidad específica por dominio
// controller: controlan rutas, son los encargados de escuchar la solicitud y emitir respuesta

@Module({
  imports: [CarsModule, BrandsModule, SeedModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule { }
