import { getConnection } from 'typeorm';
import { Response, Request } from 'express';

import Classification from '../database/entity/Classification';

export default class ClassificationController {
  static async store(req: Request, res: Response) {
    const classificationRepository = getConnection().getRepository(
      Classification
    );

    const { name, description, imgUrl = null } = req.body;

    let classification = await classificationRepository.findOne({
      where: { description },
    });

    if (classification) {
      return res.status(201).json(classification);
    }

    classification = classificationRepository.create({
      description,
      name,
      imgUrl,
    });

    await classificationRepository.save(classification);

    return res.status(201).json(classification);
  }

  static async index(_: Request, res: Response) {
    const classificationRepository = getConnection().getRepository(
      Classification
    );

    let classifications = await classificationRepository.find({
      relations: ['diseases'],
    });

    return res.status(200).json(classifications);
  }
}
