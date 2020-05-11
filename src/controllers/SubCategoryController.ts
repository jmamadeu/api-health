import { getConnection } from 'typeorm';
import { Response, Request } from 'express';

import SubCategory from '../database/entity/SubCategory';

export default class subcategoryController {
  static async store(req: Request, res: Response) {
    const subcategoryRepository = getConnection().getRepository(SubCategory);

    const { name, description, imgUrl = null, category } = req.body;

    let subcategory = await subcategoryRepository.findOne({ where: { name } });

    if (subcategory) {
      return res.status(201).json(subcategory);
    }

    subcategory = subcategoryRepository.create({
      name,
      description,
      imgUrl,
      category,
    });

    await subcategoryRepository.save(subcategory);

    return res.status(201).json(subcategory);
  }

  static async index(_: Request, res: Response) {
    const subcategoryRepository = getConnection().getRepository(SubCategory);

    let subcategories = await subcategoryRepository.find({
      relations: ['category', 'diseases'],
    });

    return res.status(200).json(subcategories);
  }
}
