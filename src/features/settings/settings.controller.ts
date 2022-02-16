import { Request, Response } from 'express';

import BaseController from 'http/BaseController';
import SettingsService from './settings.service';

export default class SettingsController extends BaseController {
  static async reload(req: Request, res: Response): Promise<void> {
    super.sendResponse(req, res, await SettingsService.reload());
  }
}
