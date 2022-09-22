import Fetch from './fetch';

const initialFetch = window.fetch;
const fetchMock = jest
  .fn()
  .mockResolvedValue({ ok: true, status: 200, json: jest.fn().mockResolvedValue({}) });

describe('fetch', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(fetchMock);
  });

  afterEach(() => {
    window.fetch = initialFetch;
  });

  it('calls window.fetch with the correct params', () => {
    const expectedBody = { name: 'test' };
    const expectedMethod = 'POST';
    Fetch('/fake-api', { body: expectedBody, method: expectedMethod });

    expect(fetchMock).toBeCalledWith(
      '/fake-api',
      expect.objectContaining({ body: JSON.stringify(expectedBody), method: expectedMethod })
    );
  });

  it('throws an error if the url is unavailable', () => {});

  it('resolves with data if response is ok', async () => {
    const expectedData: Crusader.ListItem = { id: 1, name: 'Test' };
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ data: expectedData })
    });

    const data = await Fetch<Crusader.ListItem>('/fake-api', { method: 'GET' });
    expect(data).toMatchObject(expectedData);
  });

  it('throws an error with an error message if provided by the api', () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({ data: 'Internal server error' })
    });

    expect(() => Fetch('/fake-api', { method: 'GET' })).rejects.toThrow('Internal server error');
  });

  it('throws an error with the status code if response is not ok', () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({})
    });

    expect(() => Fetch('/fake-api', { method: 'GET' })).rejects.toThrow(
      'API request failed. Status: 401'
    );
  });

  it('throws an error if the request url is unavailable', () => {
    fetchMock.mockRejectedValue({});

    expect(() => Fetch('/fake-api', { method: 'GET' })).rejects.toThrow('Unable to connect to API');
  });
});
