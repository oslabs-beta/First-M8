/*
time-to-seconds conversion
*/
const timeToSeconds = {
  '1 Second': { value: 1, step: 1 },
  '10 Seconds': { value: 10, step: 1 },
  '1 Minute': { value: 60, step: 1 },
  '5 Minutes': { value: 60 * 5, step: 1 },
  '15 Minutes': { value: 15 * 60, step: 3 },
  '30 Minutes': { value: 30 * 60, step: 7 },
  '1 Hour': { value: 60 * 60, step: 14 },
  '3 Hours': { value: 60 * 60 * 3, step: 42 },
  '6 Hours': { value: 60 * 60 * 6, step: 86 },
  '12 Hours': { value: 60 * 60 * 12, step: 172 },
};

/*
takes data selections and translates them into PromQL queries to send back:
currently, only handles range queries and instant queries with single metric
selection, sum/average/min/max, and filtering
does not yet handle complex queries with multple metrics selected, queries
using division or multiplication, or grouping
all parameters but labels are arrays, labels is an object
*/
function queryAlgo(metric, time, aggre, labels) {
  let fullQuery = '';
  if (!metric || metric.length === 0) return fullQuery;
  const aggreQuery = aggregationParser(aggre);
  const metricQuery = metricParser(metric, aggreQuery.valid);
  const labelQuery = labelParser(labels);
  fullQuery = aggreQuery.query + metricQuery + labelQuery;
  fullQuery += ')'.repeat(aggreQuery.count);
  let timeStart;
  const timeNow = Date.now() / 1000;
  if (time !== null && time !== undefined && time.length > 0) {
    timeStart = timeToSeconds[time[0]];
    fullQuery += `&start=${timeNow - timeStart.value}&end=${timeNow}&step=${
      timeStart.step
    }`;
  }
  return fullQuery;
}

/*
helper function to help build out the aggregation portion
of the query
*/
function aggregationParser(aggre) {
  const aggreObj = { count: 0, valid: false };
  let aggreStr = '';
  if (
    aggre !== null
    && aggre !== undefined
    && Array.isArray(aggre)
    && aggre.length > 0
  ) {
    aggreStr += 'query=';
    aggreObj.valid = true;
    for (let i = 0; i < aggre.length; i++) {
      // if (i !== 0) aggreStr += "(";
      aggreObj.count += 1;
      aggreStr += `${aggre[i].toLowerCase()}(`;
    }
  }
  aggreObj.query = aggreStr;
  return aggreObj;
}

/*
helper function to help build out the metric portion
of the query
*/
function metricParser(metric, aggreBool) {
  let metricStr = '';
  if (!aggreBool) metricStr += 'query=';
  metricStr += metric[0];
  return metricStr;
}

/*
helper function to help build out the label portion
of the query
*/
function labelParser(labels) {
  let labelStr = '';
  if (labels !== null && labels !== undefined) {
    const keyArr = Object.keys(labels);
    for (let i = 0; i < keyArr.length; i++) {
      if (labels[keyArr[i]] !== '') {
        if (labelStr !== '') labelStr += ',';
        labelStr += `${keyArr[i]}="${labels[keyArr[i]]}"`;
      }
    }
  }
  if (labelStr !== '') labelStr = `{${labelStr}}`;
  return labelStr;
}

module.exports = queryAlgo;
