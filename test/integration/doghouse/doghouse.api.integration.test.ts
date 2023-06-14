import request from 'supertest'
import { VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { SequelizeModule } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'
import { PostgreSqlContainer } from 'testcontainers'
import type { INestApplication } from '@nestjs/common'

import { umzug } from '~/../test/common/umzug'
import { Doghouse } from '~/periphery/persistence/doghouse/doghouse.model'
import { DoghouseModule } from '~/periphery/doghouse.module'
import type { DoghouseCreateDto } from '~/application/doghouse/doghouse-create.dto'

describe('DoghouseController (version 1) integration test', () => {
  let app: INestApplication

  beforeAll(async () => {
    const container = await new PostgreSqlContainer().start()

    const module = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          uri: container.getConnectionUri(),
          models: [Doghouse]
        }),
        DoghouseModule
      ]
    }).compile()

    await umzug(module.get(Sequelize)).up()
    app = await module
      .createNestApplication()
      .enableVersioning({ type: VersioningType.URI })
      .init()
  }, 15_000)

  afterAll(async () => app.close())

  describe('POST /v1/doghouse/create', () => {
    it('should return Created for a newly created doghouse', async () => {
      const createDoghouseDto: DoghouseCreateDto = {
        name: 'Woof Manor',
        color: 'Brown',
        weight: 12,
        tail: 1
      }

      const response = await request(app.getHttpServer())
        .post('/v1/doghouse/create')
        .send(createDoghouseDto)

      const createdDoghouse = await Doghouse.findOne({
        where: { name: createDoghouseDto.name }
      })

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({
        ...createdDoghouse?.get(),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: expect.any(Number)
      })
    })

    it('should return Bad Request for a duplicate doghouse', async () => {
      const createDoghouseDto: DoghouseCreateDto = {
        name: 'Puppy Paradise',
        color: 'Pink',
        weight: 22,
        tail: 2
      }

      await Doghouse.create({ ...createDoghouseDto })

      const response = await request(app.getHttpServer())
        .post('/v1/doghouse/create')
        .send(createDoghouseDto)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        statusCode: 400,
        message: 'A doghouse with the same name already exists',
        error: 'Bad Request'
      })
    })

    it('should return Bad Request for invalid doghouse data', async () => {
      const createDoghouseDto: DoghouseCreateDto = {
        name: '',
        color: '',
        weight: 0,
        tail: -1
      }

      const response = await request(app.getHttpServer())
        .post('/v1/doghouse/create')
        .send(createDoghouseDto)

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

  describe('GET /v1/doghouse/list', () => {
    it('should return OK and doghouses with correct properties', async () => {
      const createDoghouseDto: DoghouseCreateDto = {
        name: 'Furry Fortress',
        color: 'Purple',
        weight: 14,
        tail: 1
      }

      await Doghouse.create({ ...createDoghouseDto })

      const response = await request(app.getHttpServer())
        .get('/v1/doghouse/list')
        .query({ page: 1, limit: 9 })

      expect(response.statusCode).toBe(200)
      expect(response.body).toContainEqual({
        ...createDoghouseDto,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: expect.any(Number)
      })
    })

    it('should return OK and sorted doghouses with pagination', async () => {
      const createDoghouseDtos: DoghouseCreateDto[] = [
        { name: 'Woof retreat', color: 'Yellow', tail: 2, weight: 18 },
        { name: 'Barkside villa', color: 'White', tail: 1, weight: 14 },
        { name: 'Snuggle den', color: 'Pink', tail: 1, weight: 12 }
      ]

      await Doghouse.bulkCreate(createDoghouseDtos)

      const response = await request(app.getHttpServer())
        .get('/v1/doghouse/list')
        .query({ page: 1, limit: 2, attribute: 'name', order: 'desc' })

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(2)
      expect(response.body).toStrictEqual(
        [...response.body].sort((a, b) => (a.name < b.name ? 1 : -1))
      )
    })

    it('should return Bad Request for invalid request queries', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/doghouse/list')
        .query({ page: -1, limit: 0, attribute: 'prop', order: 'up' })

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        statusCode: 400,
        message: [
          'page must be a positive number',
          'limit must be a positive number',
          'attribute is not a valid key of the Doghouse model',
          'order must be one of the following values: asc, desc'
        ],
        error: 'Bad Request'
      })
    })
  })
})
