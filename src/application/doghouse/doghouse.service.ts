import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Doghouse } from '~/periphery/persistence/doghouse/doghouse.model'
import type { DoghouseCreateDto } from '~/application/doghouse/doghouse-create.dto'
import type { DoghouseListDto } from '~/application/doghouse/doghouse-list.dto'

export class DuplicateDoghouseException extends BadRequestException {}

@Injectable()
export class DoghouseService {
  constructor(
    @InjectModel(Doghouse) private readonly doghouseModel: typeof Doghouse
  ) {}

  async findAll(options: DoghouseListDto): Promise<Doghouse[]> {
    return await this.doghouseModel.findAll({
      order: [[options.attribute, options.order]],
      offset: options.limit * (options.page - 1),
      limit: options.limit
    })
  }

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
