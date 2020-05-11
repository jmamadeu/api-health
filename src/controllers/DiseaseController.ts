import { getConnection } from 'typeorm';
import { Response, Request } from 'express';

import Disease from '../database/entity/Disease';
import Symptom from '../database/entity/Symptom';

export default class DiseaseController {
  static async store(req: Request, res: Response) {
    const diseaseRepository = getConnection().getRepository(Disease);

    let {
      name,
      description,
      treatment,
      subCategory,
      classification,
      symptoms,
      imgUrl = null,
    } = req.body;

    let disease = await diseaseRepository.findOne({
      where: { name: req.body.name },
    });

    if (disease) {
      return res.status(201).json(disease);
    }

    const symptomRepository = getConnection().getRepository(Symptom);

    symptoms = await Promise.all(
      symptoms.map(async (symptom) => {
        const symptomItem = await symptomRepository.findOne({
          where: { id: symptom },
        });

        return symptomItem;
      })
    );

    disease = diseaseRepository.create({
      name,
      treatment,
      subCategory,
      classification,
      symptoms,
      description,
      imgUrl,
    });

    await diseaseRepository.save(disease);

    return res.status(201).json(disease);
  }

  static async index(_: Request, res: Response) {
    const diseaseRepository = getConnection().getRepository(Disease);

    let diseases = await diseaseRepository.find({
      relations: [
        'subCategory',
        'classification',
        'subCategory.category',
        'symptoms',
      ],
    });

    return res.status(200).json(diseases);
  }
}
