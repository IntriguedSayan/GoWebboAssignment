import { IsString, IsNotEmpty, IsInt, Min } from "class-validator";

export class CreatePatientDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @Min(0)
    age: number;

}