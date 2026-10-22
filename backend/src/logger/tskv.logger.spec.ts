import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  it('formatMessage returns TSKV string', () => {
    const logger = new TskvLogger();
    expect(
      logger.formatMessage(
        'log',
        'Starting Nest application...',
        'NestFactory',
      ),
    ).toEqual(
      'level=log\tmessage=Starting Nest application...\toptionalParams=NestFactory',
    );
  });

  it('log prints TSKV via console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    new TskvLogger().log('Starting Nest application...', 'NestFactory');

    expect(spy).toHaveBeenCalledWith(
      'level=log\tmessage=Starting Nest application...\toptionalParams=NestFactory',
    );
    spy.mockRestore();
  });

  it('error prints TSKV via console.error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    new TskvLogger().error('Starting Nest application...', 'NestFactory');

    expect(spy).toHaveBeenCalledWith(
      'level=error\tmessage=Starting Nest application...\toptionalParams=NestFactory',
    );
    spy.mockRestore();
  });
});
