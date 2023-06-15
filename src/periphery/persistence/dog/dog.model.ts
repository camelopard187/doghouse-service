import { Column, Model, Table, Unique } from 'sequelize-typescript'
import type { Optional } from 'sequelize'

export interface DogAttributes {
  id: number

  name: string
  color: string
  tail: number
  weight: number

  createdAt: Date
  updatedAt: Date
}

export type DogCreationAttributes = Optional<
  DogAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

@Table
export class Dog extends Model<DogAttributes, DogCreationAttributes> {
  @Unique
  @Column
  name!: string

  @Column
  color!: string

  @Column
  tail!: number

  @Column
  weight!: number
}
