import { IsString } from "class-validator";

export class CreateCarDto {
    @IsString()
    readonly brand: string;
    @IsString()
    readonly model: string
}

// los DTO tienen que ser class para poder validar datos más adelante