import request from 'supertest'

import app from '../../app'

const diaseaseTypesTableName = 'tb_diasease_types'

import dbConnection from '../../database'

describe('DiaseaseType', () => {
  beforeAll( async () => {
    await dbConnection(diaseaseTypesTableName).del()
  })

  beforeEach(() => {
    jest.setTimeout(10000)
  })

  afterAll(async () => {
    await dbConnection.destroy()
  })

  it('Should be to able of get all diasease_types', async () => {
    await request(app).post('/diasease-types').send({
      name: 'Doenças pulmonares',
      description: 'Sem descricao',
      notes: 'Sem notas'
    })

    await request(app).post('/diasease-types').send({
      name: 'Doenças Respiratórias',
      description: 'Sem descricao',
      notes: 'Sem notas'
    })

    await request(app).post('/diasease-types').send({
      name: 'Doenças Cardiovasculares',
      description: 'Sem descricao',
      notes: 'Sem notas'
    })

    const response = await request(app).get('/diasease-types')

    expect(response.status).toBe(200)
    expect(response.body.data).toHaveLength(3)
  })

  it('Should be to able to create a new diasease_type', async () => {
    
    let response = await request(app).post('/diasease-types').send({
      name: 'Doenças de Teste',
      description: 'Sem descricao',
      notes: 'Sem notas'
    })

    expect(response.status).toBe(200)

    response = await request(app).post('/diasease-types').send({
      name: 'Doenças de Teste',
      description: 'Sem descricao',
      notes: 'Sem notas'
    })

    expect(response.status).toBe(409)

  })

  it('Should be to able to update a new diasease_type', async () => {
    let response = await request(app).post('/diasease-types').send({
      name: 'Doença grave',
      description: 'Gravisimo',
      notes: 'Sem notas'
    })

    const id = response.body.data.dty_id

    response = await request(app).put(`/diasease-types/${id}`).send({
      name: 'Nova Doença',
      description: 'Dença grave',
      notes: 'Sem notas'
    })

    expect(response.status).toBe(200)

    response = await request(app).put(`/diasease-types/ASaskdsdjhk34-3445435-3453423`).send({
      name: 'Nova Doença',
      description: 'Dença grave',
      notes: 'Sem notas'
    })

    expect(response.status).toBe(400)
  })

  test('Should be to able delete one Diasease_type', async () => {
    let response = await request(app).post('/diasease-types').send({
      name: 'Doença das dores',
      description: 'Gravisimo',
      notes: 'Sem notas'
    })

    const id = response.body.data.dty_id

    response = await request(app).delete(`/diasease-types/${id}`)
    expect(response.status).toBe(200)
    expect(response.body.status).toBe('success')
    
    response = await request(app).delete(`/diasease-types/3232hjgsdydst63ghd`)
    expect(response.status).toBe(400)
  })

  it('Should be to able get one', async () => {
    let response = await request(app).post('/diasease-types').send({
      name: 'Doenças de alto teor',
      description: 'Gravisimo',
      notes: 'Sem notas'
    })

    const id = response.body.data.dty_id

    response = await request(app).get(`/diasease-types/${id}`)
    expect(response.status).toBe(200)
    expect(response.body.status).toBe('success')
    
    response = await request(app).get(`/diasease-types/3232hjgsdydst63ghd`)
    expect(response.status).toBe(400)
  })
  
})