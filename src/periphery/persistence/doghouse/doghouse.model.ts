import { Column, Model, Table, Unique } from 'sequelize-typescript'
import type { Optional } from 'sequelize'

export interface DoghouseAttributes {
  id: number

  name: string
  color: string
  tail: number
  weight: number

  createdAt: Date
  updatedAt: Date
}

export type DoghouseCreationAttributes = Optional<
  DoghouseAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

@Table
export class Doghouse extends Model<
  DoghouseAttributes,
  DoghouseCreationAttributes
> {
  @Unique @Column name!: string
  @Column color!: string
  @Column tail!: number
  @Column weight!: number
}
