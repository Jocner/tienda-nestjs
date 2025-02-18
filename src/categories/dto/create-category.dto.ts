import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateCategoryDto {
    // @IsOptional()
    // id: number
    @IsNotEmpty({message: 'El Nombre de la Categoría no puede ir vacio'})
    name: string
}
