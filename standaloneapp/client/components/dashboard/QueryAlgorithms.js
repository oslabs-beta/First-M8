//http_requests_total{status!~"4.."}

//http_requests_total{job="apiserver", handler="/api/comments"}
//instance_cpu_time_ns{app="lion", proc="web", rev="34d0f99", env="prod", job="cluster-manager"}

//max_over_time(deriv(rate(distance_covered_total[5s])[30s:5s])[10m:])

//rate(http_requests_total[5m])

//http_requests_total[5m]
//

//deriv(v range-vector) calculates the per second derivative of
//the time series in a range vector v, using linear regression

//rate calculates the per second average rate of increase of the time series in the range vector.
//also calculation extrapolates to the end of the time range, allowing for missed scrapes or
//imperfect alignment of scrape cycles with the range's time period

//future prospect; PEMDAS styled priority for different queries

/* 
In this example we're finding out the proportion of time the CPU spends in idle mode

Sum the input
|     The target metric
|     |                       The type of the metric
|     |                       |               "by" the CPU
v     v                       v               V
sum(node_cpu_seconds_total{mode = idle}) by (cpu)



We aggregate the metrics by only the cpu label at the end
to start to refinem we use the "by" operator, tells "only aggregate by these operators"

*/

/* 
{
  metric: func,
  timestart : 30s,
  timeend: 1m,
  time: 5m,
}
*/

const timeToSeconds = {
  "1 Second": { value: 1, step: 1 },
  "10 Seconds": { value: 10, step: 1 },
  "1 Minute": { value: 60, step: 1 },
  "5 Minutes": { value: 60 * 5, step: 1 },
  "15 Minutes": { value: 15 * 60, step: 3 },
  "30 Minutes": { value: 30 * 60, step: 7 },
  "1 Hour": { value: 60 * 60, step: 14 },
  "3 Hours": { value: 60 * 60 * 3, step: 42 },
  "6 Hours": { value: 60 * 60 * 6, step: 86 },
  "12 Hours": { value: 60 * 60 * 12, step: 172 },
};

function queryAlgo(metric, time, aggre, labels) {
  let fullQuery = "";
  if (!metric || metric.length === 0) return fullQuery;
  const aggreQuery = aggregationParser(aggre);
  const metricQuery = metricParser(metric, aggreQuery.valid);
  const labelQuery = labelParser(labels);
  fullQuery = aggreQuery.query + metricQuery + labelQuery;
  fullQuery += ")".repeat(aggreQuery.count);
  let timeStart;
  if (time !== null && time !== undefined && time.length > 0) {
    timeStart = timeToSeconds[time[0]];
  } else {
    timeStart = timeToSeconds["6 Hours"];
  }
  const timeNow = Date.now() / 1000;
  fullQuery += `&start=${timeNow - timeStart.value}&end=${timeNow}&step=${
    timeStart.step
  }`;
  return fullQuery;
}

function aggregationParser(aggre) {
  const aggreObj = { count: 0, valid: false };
  let aggreStr = "";
  if (
    aggre !== null &&
    aggre !== undefined &&
    Array.isArray(aggre) &&
    aggre.length > 0
  ) {
    aggreStr += "query=";
    aggreObj.valid = true;
    for (let i = 0; i < aggre.length; i++) {
      // if (i !== 0) aggreStr += "(";
      aggreObj.count += 1;
      aggreStr += aggre[i].toLowerCase() + "(";
    }
  }
  aggreObj.query = aggreStr;
  return aggreObj;
}
function metricParser(metric, aggreBool) {
  let metricStr = "";
  if (!aggreBool) metricStr += "query=";
  metricStr += metric[0];
  return metricStr;
}
function labelParser(labels) {
  let labelStr = "";
  if (labels !== null && labels !== undefined) {
    const keyArr = Object.keys(labels);
    for (let i = 0; i < keyArr.length; i++) {
      if (labels[keyArr[i]] !== null) {
        if (i !== 0) labelStr += ",+";
        labelStr += `${keyArr[i]}="${labels[keyArr[i]]}"`;
      }
    }
  }
  if (labelStr !== "") labelStr = "{" + labelStr + "}";
  return labelStr;
}

// function simpleAlgo (...args){
//   let output = 'query=';
//   for(const arg of args){
//     if(output !== 'query='){
//       output += '&'
//     }
//     output += arg;
//   }
//   output += `&time=${Date.now()/1000}`
//   return output; // ?query=http_seconds&time=34s
// }
// dashboard---------
// const  query= queryAlgo.simpleAlgo({http_request})
// fetch(`localhost:9090/api/v1/query?${query}`).then(updatecolumns)

/* 
4 parameters
1. array of metric ex. http_total
2. array per timerange  [1hr] - 12 hours, 6 hours, 3 hours, 1 hour, 30 minutes, 15 minutes, 5 minutes, 1 minute, 10 seconds, 1 second
3. array of aggregations(functions) ex. sum, multiply
//default timerange to 6hrs
// if not there - null
4. object - filters/prometheus labels 

*/

module.exports = queryAlgo;
