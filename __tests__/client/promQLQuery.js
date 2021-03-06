import queryAlgo from '../../client/components/dashboard/promQLQueryAlgorithms';

const timeToSeconds = {
  oneSecond: 1,
  tenSeconds: 10,
  oneMinute: 60,
  fiveMinutes: 60 * 5,
  fifteenMinutes: 15 * 60,
  thirtyMinutes: 30 * 60,
  oneHour: 60 * 60,
  threeHours: 60 * 60 * 3,
  sixHours: 60 * 60 * 6,
  twelveHours: 60 * 60 * 12,
};

describe('simple queries test', () => {
  let timeNow;
  beforeEach(() => {
    jest.useFakeTimers('modern');
    timeNow = Date.now() / 1000;
  });
  const myQuery = ['prometheus_http_requests_total'];
  it('should carry out one metric default time', () => {
    expect(queryAlgo(myQuery)).toEqual(
      'query=prometheus_http_requests_total',
    );
  });
  const myTime = ['30 Minutes'];
  it('should carry out one metric with custom time', () => {
    expect(queryAlgo(myQuery, myTime)).toEqual(
      `query=prometheus_http_requests_total&start=${
        timeNow - timeToSeconds.thirtyMinutes
      }&end=${timeNow}&step=7`,
    );
  });
  describe('should return empty string if empty/null metric', () => {
    it('returns empty string for undefined metric', () => {
      expect(queryAlgo()).toEqual('');
    });
    it('returns empty string for null metric', () => {
      expect(queryAlgo(null, myTime)).toEqual('');
    });
  });
});

describe('query algos with aggregations', () => {
  let timeNow;
  beforeEach(() => {
    jest.useFakeTimers('modern');
    timeNow = Date.now() / 1000;
  });
  const myQuery = ['prometheus_http_requests_total'];
  let myTime; let
    myAggre;
  it('handles single aggregation', () => {
    myTime = null;
    myAggre = ['Sum'];
    expect(queryAlgo(myQuery, myTime, myAggre)).toEqual(
      'query=sum(prometheus_http_requests_total)',
    );
  });
  it('handles multiple aggregations', () => {
    myTime = null;
    myAggre = ['Max', 'Sum'];
    expect(queryAlgo(myQuery, myTime, myAggre)).toEqual(
      'query=max(sum(prometheus_http_requests_total))',
    );
  });
  it('handles aggregations with time argument', () => {
    myTime = ['5 Minutes'];
    myAggre = ['Sum'];
    expect(queryAlgo(myQuery, myTime, myAggre)).toEqual(
      `query=sum(prometheus_http_requests_total)&start=${
        timeNow - timeToSeconds.fiveMinutes
      }&end=${timeNow}&step=1`,
    );
    myAggre = ['Max', 'Sum'];
    expect(queryAlgo(myQuery, myTime, myAggre)).toEqual(
      `query=max(sum(prometheus_http_requests_total))&start=${
        timeNow - timeToSeconds.fiveMinutes
      }&end=${timeNow}&step=1`,
    );
  });
});

describe('query algos with labels', () => {
  let timeNow;
  beforeEach(() => {
    jest.useFakeTimers('modern');
    timeNow = Date.now() / 1000;
  });
  const myQuery = ['prometheus_http_requests_total'];
  let myTime; let myAggre; let
    myLabels;
  it('handles single labels', () => {
    myTime = null;
    myAggre = null;
    myLabels = { job: 'apiserver' };
    expect(queryAlgo(myQuery, myTime, myAggre, myLabels)).toEqual(
      'query=prometheus_http_requests_total{job="apiserver"}',
    );
  });
  it('handles multiple labels', () => {
    myTime = null;
    myAggre = null;
    myLabels = { job: 'apiserver', handler: '/api/comments' };
    expect(queryAlgo(myQuery, myTime, myAggre, myLabels)).toEqual(
      'query=prometheus_http_requests_total{job="apiserver",handler="/api/comments"}',
    );
  });
  it('handles labels with time argument', () => {
    myTime = ['5 Minutes'];
    myAggre = null;
    myLabels = { job: 'apiserver', hello: '' };
    expect(queryAlgo(myQuery, myTime, myAggre, myLabels)).toEqual(
      `query=prometheus_http_requests_total{job="apiserver"}&start=${
        timeNow - timeToSeconds.fiveMinutes
      }&end=${timeNow}&step=1`,
    );
    myLabels = { job: 'apiserver', handler: '/api/comments' };
    expect(queryAlgo(myQuery, myTime, myAggre, myLabels)).toEqual(
      `query=prometheus_http_requests_total{job="apiserver",handler="/api/comments"}&start=${
        timeNow - timeToSeconds.fiveMinutes
      }&end=${timeNow}&step=1`,
    );
  });
});

xdescribe('query algos with aggregations and labels', () => {
  let timeNow;
  beforeEach(() => {
    jest.useFakeTimers('modern');
    timeNow = Date.now() / 1000;
  });
  const myQuery = 'prometheus_http_requests_total';
  it('', () => {});
});
