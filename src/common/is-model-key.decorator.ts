import { registerDecorator } from 'class-validator'
import type { Model } from 'sequelize-typescript'

export const IsModelKey =
  <M extends typeof Model<object>>(model: M) =>
  (object: object, propertyKey: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName: propertyKey,
      options: {
        message: `${propertyKey} is not a valid key of the ${model.name} model`
      },
      validator: {
        validate: (value: string) =>
          Object.keys(model.rawAttributes).includes(value)
      }
    })
