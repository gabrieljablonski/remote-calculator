import { reloadConfig } from 'config';
import { reloadLoggerConfig } from 'logging';
import ServiceResponse from 'http/ServiceResponse';

export default class SettingsService {
  static async reload(): Promise<ServiceResponse<null>> {
    reloadConfig();
    reloadLoggerConfig();
    return ServiceResponse.ok({
      message: 'settings reloaded',
    });
  }
}
