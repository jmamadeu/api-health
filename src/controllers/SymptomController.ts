import { getConnection } from 'typeorm';
import { Response, Request } from 'express';

import Symptom from '../database/entity/Symptom';

export default class SymptomController {
  static async store(req: Request, res: Response) {
    const symptomRepository = getConnection().getRepository(Symptom);

    const { description, imgUrl = null } = req.body;

    let symptom = await symptomRepository.findOne({ where: { description } });

    if (symptom) {
      return res.status(201).json(symptom);
    }

    symptom = symptomRepository.create({ description, imgUrl });

    await symptomRepository.save(symptom);

    return res.status(201).json(symptom);
  }

  static async index(_: Request, res: Response) {
    const symptomRepository = getConnection().getRepository(Symptom);

    let symptoms = await symptomRepository.find({ relations: ['diseases'] });

    return res.status(200).json(symptoms);
  }
}
