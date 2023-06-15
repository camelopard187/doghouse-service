import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Dog } from '~/periphery/persistence/dog/dog.model'
import type { DogCreateDto } from '~/application/dog/dog-create.dto'
import type { DogListDto } from '~/application/dog/dog-list.dto'

export class DuplicateDogException extends BadRequestException {}

@Injectable()
export class DogService {
  constructor(@InjectModel(Dog) private readonly dogModel: typeof Dog) {}

  async findAll(options: DogListDto): Promise<Dog[]> {
    return await this.dogModel.findAll({
      order: [[options.attribute, options.order]],
      offset: options.limit * (options.page - 1),
      limit: options.limit
    })
  }

  async create(createDogDto: DogCreateDto): Promise<Dog> {
    if (
      await this.dogModel.findOne({
        where: { name: createDogDto.name }
      })
    )
      throw new DuplicateDogException(
        'The dog with the same name already exists'
      )

    return await this.dogModel.create({ ...createDogDto })
  }
}
