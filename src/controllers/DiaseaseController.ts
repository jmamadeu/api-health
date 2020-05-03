import { Response, Request, request } from 'express';
import { v4 as uuid } from 'uuid';

import dbConnection from '../database';

const diaseaseTableName = 'tb_diaseases';

interface IDiasease {
  dia_id: string;
  dia_name: string;
  dia_description: string;
  dia_history: Text;
  dia_current_status: string;
  dia_code: string;
  dia_notes: string;
  dia_dty_id: any;
}

export default {
  async create(req: Request, res: Response) {
    try {
      const dia_id = uuid();

      let diasease = req.body;
      const { diasease_type_id: dia_dty_id } = req.headers;

      diasease = {
        dia_id,
        dia_name: diasease.name,
        dia_description: diasease.description,
        dia_history: diasease.history,
        dia_current_status: diasease.current_status,
        dia_code: diasease.code,
        dia_notes: diasease.notes,
        dia_dty_id,
      };

      let response = await dbConnection<IDiasease>(diaseaseTableName)
        .where({
          dia_name: diasease.dia_name,
          dia_code: diasease.dia_code,
        })
        .select()
        .first();

      if (response) {
        return res.status(409).json({
          status: 'conflict',
          message: 'A doença já exitse',
        });
      }

      response = await dbConnection<IDiasease>(diaseaseTableName).insert(
        diasease
      );

      return res.status(200).json({
        status: 'success',
        data: diasease,

        message: 'Doença cadastrada com sucesso!',
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async update(req: Request, res: Response) {
    try {
      let diasease = req.body;
      const { id: dia_id } = req.params;
      const { diasease_type_id: dia_dty_id } = req.headers;

      diasease = {
        dia_name: diasease.name,
        dia_description: diasease.description,
        dia_history: diasease.history,
        dia_current_status: diasease.current_status,
        dia_code: diasease.code,
        dia_notes: diasease.notes,
        dia_dty_id,
      };

      let response = await dbConnection<IDiasease>(diaseaseTableName).where({
        dia_id,
      });

      if (!response) {
        return res.status(400).json({
          status: 'error',
          message: 'A doença não exitse',
        });
      }

      response = await dbConnection<IDiasease>(diaseaseTableName)
        .where('dia_id', dia_id)
        .update(diasease);

      return res.status(200).json({
        status: 'success',
        data: { dia_id, ...diasease },
        message: 'Editada com sucesso!',
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async index(req: Request, res: Response) {
    try {
      const diaseases = await dbConnection<IDiasease>(
        diaseaseTableName
      ).select();

      return res.status(200).json({
        data: diaseases,
        status: 'success',
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async show(req: Request, res: Response) {
    try {
      const diaseaseId = req.params.id;

      const diasease = await dbConnection<IDiasease>(diaseaseTableName)
        .where('dia_id', diaseaseId)
        .select()
        .first();

      if (!diasease) {
        return res.status(400).json({
          status: 'error',
        });
      }

      return res.status(200).json({
        data: diasease,
        status: 'success',
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const diaseaseId = req.params.id;

      const diasease = await dbConnection<IDiasease>(diaseaseTableName)
        .where('dia_id', diaseaseId)
        .select()
        .first();

      if (!diasease) {
        return res.status(400).json({
          status: 'error',
        });
      }

      await dbConnection<IDiasease>(diaseaseTableName).where(
        'dia_id',
        diaseaseId
      );

      return res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
