import { Response, Request } from 'express';
import dbConnetion from '../../database';
import { v4 as uuid } from 'uuid';

interface IDiaseaseType {
  dty_id: string;
  dty_name: string;
  dty_description: string;
  dty_notes: string;
}

const diaseaseTypeTableName = 'tb_diasease_types';

export default {
  async index(req: Request, res: Response) {
    try {
      const data = await dbConnetion<IDiaseaseType[]>(diaseaseTypeTableName).select();

      return res.status(200).json({ status: 'success', data });
    } catch (err) {
      console.log('Controller:DiaseaseType:index', err);

      return res.status(500).json({
        status: 'error',
        message: 'Houve um erro inesperado, tente novamnete!',
      });
    }
  },

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = await dbConnetion<IDiaseaseType>(diaseaseTypeTableName)
        .where('dty_id', id)
        .first();

      if (!data) {
        return res.status(400).json({
          status: 'error',
          message: 'A categoria de doença não existe',
        });
      }

      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (err) {
      console.log('Controller:DiaseaseType:show', err);

      return res.status(500).json({
        status: 'error',
        message: 'Houve um erro inesperado, tente novamnete!',
      });
    }
  },

  async store(req: Request, res: Response) {
    try {
      const { name, description, notes } = req.body;
      const id = uuid();

      let diasease_type = await dbConnetion<IDiaseaseType>(diaseaseTypeTableName)
        .where('dty_name', name)
        .select()
        .first();

      if (!diasease_type) {
        diasease_type = await dbConnetion<IDiaseaseType>(diaseaseTypeTableName).insert({
          dty_id: id,
          dty_name: name,
          dty_description: description,
          dty_notes: notes,
        });

        return res.status(200).json({
          data: {
            dty_id: id,
            dty_name: name,
            dty_description: description,
            dty_notes: notes,
          },
          status: 'success',
        });
      }

      return res.status(409).json({
        status: 'conflict',
        message: 'A categoria já existe!',
      });
    } catch (err) {
      console.log('Controller:DiaseaseType:store', err);

      return res.status(500).json({
        status: 'error',
        message: 'Houve um erro inesperado, tente novamnete!',
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { name, description, notes } = req.body;
      const { id } = req.params

      let diasease_type = await dbConnetion<IDiaseaseType>(diaseaseTypeTableName)
        .where('dty_id', id)
        .select()
        .first();

      if (!diasease_type) {
        return res.status(400).json({
          status: 'error',
          message: 'A categoria não existe!'
        });
      }

      await dbConnetion<IDiaseaseType>(diaseaseTypeTableName).where('dty_id', id).update({
        dty_name: name,
        dty_description: description,
        dty_notes: notes
      })

      return res.status(200).json({
        data: {
          dty_id: id,
          dty_name: name,
          dty_description: description,
          dty_notes: notes
        },
        status: 'success'
      })

    }catch(err) {
      console.log('Controller:DiaseaseType:update', err);

      return res.status(500).json({
        status: 'error',
        message: 'Houve um erro inesperado, tente novamnete!',
      });
    }
  
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const diasease_type = await dbConnetion<IDiaseaseType>(diaseaseTypeTableName).where('dty_id', id).select()
      .first()

      if(!diasease_type) {
        return res.status(400).json({
          status: 'error',
          message: 'A categoria não existe!',
        });
      }

      await dbConnetion<IDiaseaseType>(diaseaseTypeTableName).where('dty_id', id).del()

      return res.status(200).json({
        status: 'success',
        message: 'Categoria da doença cadastrada com êxito!'
      })

    }catch(err) {
      console.log('Controller:DiaseaseType:delete', err);

      return res.status(500).json({
        status: 'error',
        message: 'Aconteceu um erro, tente novamente!'
      })
    }
  }
};
