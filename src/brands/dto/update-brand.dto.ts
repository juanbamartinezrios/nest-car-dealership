import { PartialType } from '@nestjs/mapped-types';
// mapped-types ayuda a extender un DTO basado en otro DTO con la excepcion de que el partialtype hace que todas las
// propiedades del DTO del cual extiendo, sean opcionales
import { CreateBrandDto } from './create-brand.dto';
import { IsString, MinLength, IsOptional, IsUUID } from "class-validator";

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    @IsUUID()
    @IsString()
    @IsOptional()
    readonly id: string;
    @IsString()
    @MinLength(1)
    readonly name: string;
}
