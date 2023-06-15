import request from 'supertest'
import { VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { SequelizeModule } from '@nestjs/sequelize'
import { PostgreSqlContainer } from 'testcontainers'
import type { INestApplication } from '@nestjs/common'

import { Dog } from '~/periphery/persistence/dog/dog.model'
import { DogModule } from '~/periphery/dog.module'
import type { DogCreateDto } from '~/application/dog/dog-create.dto'

describe('DogController (version 2) integration test', () => {
  let app: INestApplication

  beforeAll(async () => {
    const container = await new PostgreSqlContainer().start()

    const module = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          uri: container.getConnectionUri(),
          autoLoadModels: true,
          models: [Dog]
        }),
        DogModule
      ]
    }).compile()

    app = await module
      .createNestApplication()
      .enableVersioning({ type: VersioningType.URI })
      .init()
  }, 15_000)

  afterAll(async () => app.close())

  describe('POST /v2/dog/create', () => {
    it('should return Created for a newly created dog', async () => {
      const createDogDto: DogCreateDto = {
        name: 'Charlie',
        color: 'Brown',
        weight: 12,
        tail: 1
      }

      const response = await request(app.getHttpServer())
        .post('/v2/dog/create')
        .send(createDogDto)

      const createdDog = await Dog.findOne({
        where: { name: createDogDto.name }
      })

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({
        ...createdDog?.get(),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: expect.any(Number)
      })
    })

    it('should return Bad Request for a duplicate dog', async () => {
      const createDogDto: DogCreateDto = {
        name: 'Buddy',
        color: 'Pink',
        weight: 22,
        tail: 2
      }

      await Dog.create({ ...createDogDto })

      const response = await request(app.getHttpServer())
        .post('/v2/dog/create')
        .send(createDogDto)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        statusCode: 400,
        message: 'The dog with the same name already exists',
        error: 'Bad Request'
      })
    })

    it('should return Bad Request for invalid dog data', async () => {
      const createDogDto: DogCreateDto = {
        name: '',
        color: '',
        weight: 0,
        tail: -1
      }

      const response = await request(app.getHttpServer())
        .post('/v2/dog/create')
        .send(createDogDto)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        statusCode: 400,
        message: [
          'name should not be empty',
          'color should not be empty',
          'tail must be a positive number',
          'weight must be a positive number'
        ],
        error: 'Bad Request'
      })
    })
  })

  describe('GET /v2/dog/list', () => {
    it('should return OK and dogs with correct properties', async () => {
      const createDogDto: DogCreateDto = {
        name: 'Maggie',
        color: 'Purple',
        weight: 14,
        tail: 1
      }

      await Dog.create({ ...createDogDto })

      const response = await request(app.getHttpServer())
        .get('/v2/dog/list')
        .query({ page: 1, limit: 9 })

      expect(response.statusCode).toBe(200)
      expect(response.body).toContainEqual({
        ...createDogDto,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: expect.any(Number)
      })
    })

    it('should return OK and sorted dogs with pagination', async () => {
      const createDogDtos: DogCreateDto[] = [
        { name: 'Bailey', color: 'Yellow', tail: 2, weight: 18 },
        { name: 'Sadie', color: 'White', tail: 1, weight: 14 },
        { name: 'Lily', color: 'Pink', tail: 1, weight: 12 }
      ]

      await Dog.bulkCreate(createDogDtos)

      const response = await request(app.getHttpServer())
        .get('/v2/dog/list')
        .query({ page: 1, limit: 2, attribute: 'name', order: 'desc' })

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(2)
      expect(response.body).toStrictEqual(
        [...response.body].sort((a, b) => (a.name < b.name ? 1 : -1))
      )
    })

    it('should return Bad Request for invalid request queries', async () => {
      const response = await request(app.getHttpServer())
        .get('/v2/dog/list')
        .query({ page: -1, limit: 0, attribute: 'prop', order: 'up' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        statusCode: 400,
        message: [
          'page must be a positive number',
          'limit must be a positive number',
          'attribute is not a valid key of the Dog model',
          'order must be one of the following values: asc, desc'
        ],
        error: 'Bad Request'
      })
    })
  })
})
