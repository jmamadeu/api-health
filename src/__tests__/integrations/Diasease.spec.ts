import request from 'supertest';

import app from '../../app';
import dbConnection from '../../database';

describe('Diasease', () => {
  beforeAll(async () => {
    await dbConnection('tb_diasease_types').del();
    await dbConnection('tb_diaseases').del();
  });

  it('Should be to able creating diaseases', async () => {
    let response = await request(app).post('/diasease-types').send({
      name: 'Doenças pulmonares',
      description: 'Sem descricao',
      notes: 'Sem notas',
    });

    const idDiaseaseType = response.body.data.dty_id;

    const response_diasease_1 = await request(app)
      .post('/diaseases')
      .send({
        name: 'Corona Vírus',
        description: 'Corona doença grave',
        history: '...',
        current_status: 'pandemia',
        code: 'A2020',
        notes: '...',
      })
      .set('diasease_type_id', idDiaseaseType);

    const response_diasease_2 = await request(app)
      .post('/diaseases')
      .send({
        name: 'Corona Vírus',
        description: 'Corona doença grave',
        history: '...',
        current_status: 'pandemia',
        code: 'A2020',
        notes: '...',
      })
      .set('diasease_type_id', idDiaseaseType);

    const response_diaseases = await request(app).get('/diaseases');

    expect(response_diasease_1.status).toBe(200);
    expect(response_diasease_2.status).toBe(409);
    expect(response_diaseases.body.data).toHaveLength(1);
  });

  it('Should be to able of delete one diasease', async () => {
    const diaseaseTypeResponse = await request(app)
      .post('/diasease-types')
      .send({
        name: 'Doenças de leve',
        description: 'Sem descricao',
        notes: 'Sem notas',
      });

    const idDiaseaseType = diaseaseTypeResponse.body.data.dty_id;

    const response_diasease = await request(app)
      .post('/diaseases')
      .send({
        name: 'Corona de teste',
        description: 'Corona doença de teste',
        history: '...',
        current_status: 'pandemia',
        code: 'asjkh4',
        notes: '...',
      })
      .set('diasease_type_id', idDiaseaseType);

    const idDiasease = response_diasease.body.data.dia_id;

    const responseDiaseaseType1 = await request(app).delete(
      `/diaseases/${idDiasease}`
    );
    const responseDiaseaseType2 = await request(app).delete(
      `/diaseases/21433243ng4uy34gh345v34h`
    );

    expect(responseDiaseaseType1.status).toBe(200);
    expect(responseDiaseaseType1.body.status).toBe('success');

    expect(responseDiaseaseType2.body.status).toBe('error');
    expect(responseDiaseaseType2.status).toBe(400);
  });

  it('Should be to able showing diaseases', async () => {
    const diaseaseTypeResponse = await request(app)
      .post('/diasease-types')
      .send({
        name: 'Doenças sem algum significado',
        description: 'Sem descricao',
        notes: 'Sem notas',
      });

    const idDiaseaseType = diaseaseTypeResponse.body.data.dty_id;

    const response_diasease = await request(app)
      .post('/diaseases')
      .send({
        name: 'Coronaaa',
        description: 'Corona s grave',
        history: '...',
        current_status: 'pandemia',
        code: 'AQ23',
        notes: '...',
      })
      .set('diasease_type_id', idDiaseaseType);

    const idDiasease = response_diasease.body.data.dia_id;

    const responseDiasease1 = await request(app).get(
      `/diaseases/${idDiasease}`
    );
    const responseDiasease2 = await request(app).get(
      `/diaseases/23232bhjg34u6h35j`
    );

    expect(responseDiasease1.status).toBe(200);
    expect(responseDiasease1.body.status).toBe('success');

    expect(responseDiasease2.status).toBe(400);
    expect(responseDiasease2.body.status).toBe('error');
  });

  it('Should be to able upadating diaseases', async () => {
    let response = await request(app).post('/diasease-types').send({
      name: 'Doenças de dores duras',
      description: 'Sem descricao',
      notes: 'Sem notas',
    });

    const idDiaseaseType = response.body.data.dty_id;

    const responseDiasease1 = await request(app)
      .post('/diaseases')
      .send({
        name: 'Test',
        description: 'Testando',
        history: '...',
        current_status: 'pandemia',
        code: '20219',
        notes: '...',
      })
      .set('diasease_type_id', idDiaseaseType);

    const idDiasease = responseDiasease1.body.data.dia_id;

    const responseDiasease = await request(app)
      .put(`/diaseases/${idDiasease}`)
      .send({
        name: 'Teste feito com sucesso',
        description: 'Testte passou',
        history: '...',
        current_status: 'pandeminc',
        code: 'A2020',
        notes: '...',
      })
      .set('diasease_type_id', idDiaseaseType);

    expect(responseDiasease.status).toBe(200);
    expect(responseDiasease.body.data).toEqual({
      dia_id: idDiasease,
      dia_name: 'Teste feito com sucesso',
      dia_description: 'Testte passou',
      dia_history: '...',
      dia_current_status: 'pandeminc',
      dia_code: 'A2020',
      dia_notes: '...',
      dia_dty_id: idDiaseaseType,
    });
    expect(responseDiasease.body.status).toBe('success');
  });
});
