import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  it('formatMessage returns JSON', () => {
    const logger = new JsonLogger();
    expect(
      logger.formatMessage(
        'log',
        'Starting Nest application...',
        'NestFactory',
      ),
    ).toEqual(
      JSON.stringify({
        level: 'log',
        message: 'Starting Nest application...',
        optionalParams: ['NestFactory'],
      }),
    );
  });

  it('log prints JSON via console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    new JsonLogger().log('Starting Nest application...', 'NestFactory');

    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: 'Starting Nest application...',
        optionalParams: [['NestFactory']],
      }),
    );
    spy.mockRestore();
  });

  it('error prints JSON via console.error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    new JsonLogger().error('Starting Nest application...', 'NestFactory');

    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'error',
        message: 'Starting Nest application...',
        optionalParams: [['NestFactory']],
      }),
    );
    spy.mockRestore();
  });
});
