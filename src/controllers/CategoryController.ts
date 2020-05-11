import { getConnection } from 'typeorm';
import { Response, Request } from 'express';

import Category from '../database/entity/Category';

export default class CategoryController {
  static async store(req: Request, res: Response) {
    const categoryRepository = getConnection().getRepository(Category);

    const { name, description, imgUrl = null } = req.body;

    let category = await categoryRepository.findOne({ where: { name } });

    if (category) {
      return res.status(201).json(category);
    }

    category = categoryRepository.create({ name, description, imgUrl });

    await categoryRepository.save(category);

    return res.status(201).json(category);
  }

  static async index(_: Request, res: Response) {
    const categoryRepository = getConnection().getRepository(Category);

    let categorys = await categoryRepository.find();

    return res.status(200).json(categorys);
  }
}
