import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Doghouse } from '~/periphery/persistence/doghouse/doghouse.model'
import type { DoghouseCreateDto } from '~/application/doghouse/doghouse-create.dto'

export class DuplicateDoghouseException extends BadRequestException {}

@Injectable()
export class DoghouseService {
  constructor(
    @InjectModel(Doghouse) private readonly doghouseModel: typeof Doghouse
  ) {}

  async create(createDoghouseDto: DoghouseCreateDto): Promise<Doghouse> {
    if (
      await this.doghouseModel.findOne({
        where: { name: createDoghouseDto.name }
      })
    )
      throw new DuplicateDoghouseException(
        'A doghouse with the same name already exists'
      )

    return await this.doghouseModel.create({ ...createDoghouseDto })
  }
}
