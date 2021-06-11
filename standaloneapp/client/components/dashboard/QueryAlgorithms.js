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
const queryAlgorithms = {};

queryAlgorithms.minuteToMilliseconds = function () {
  return 1000 * 60;
}

queryAlgorithms.hourToMilliseconds = function () {
  return queryAlgorithms.minuteToMilliseconds() * 60;
}

queryAlgorithms.simpleAlgo = function (...args){
  let output = 'query=';
  for(const arg of args){
    if(output !== 'query='){
      output += '&'
    }
    output += arg;
  }
  return output; // ?query=http_seconds&time=34s
}

queryAlgorithms.rangeQuery = function (metric, time) {
  let query = 'query_range?query='
  const timeNow = Date.now() / 1000;
  let timeStart;
  const hourInMilliseconds = queryAlgorithms.hourToMilliseconds();
  const minuteInMilliseconds = queryAlgorithms.minuteToMilliseconds();
  if (time[0] === "12 Hours") {
    timeStart = (Date.now() - (12 * hourInMilliseconds)) / 1000;
  } else if (time[0] === "6 Hours") {
    timeStart = (Date.now() - (6 * hourInMilliseconds)) / 1000;
  } else if (time[0] === "3 Hours") {
    timeStart = (Date.now() - (3 * hourInMilliseconds)) / 1000;
  } else if (time[0] === "1 Hour") {
    timeStart = (Date.now() - (1 * hourInMilliseconds)) / 1000;
  } else if (time[0] === "30 Minutes") {
    timeStart = (Date.now() - (30 * minuteInMilliseconds)) / 1000;
  } else if (time[0] === "15 Minutes") {
    timeStart = (Date.now() - (15 * minuteInMilliseconds)) / 1000;
  } else if (time[0] === "5 Minutes") {
    timeStart = (Date.now() - (5 * minuteInMilliseconds)) / 1000;
  } else if (time[0] === "1 Minute") {
    timeStart = (Date.now() - (1 * minuteInMilliseconds)) / 1000;
  } else if (time[0] === "10 Seconds") {
    timeStart = (Date.now() - (10 * 1000)) / 1000;
  } else if (time[0] === "1 Second") {
    timeStart = (Date.now() - 1000) / 1000;
  }
  query += `${metric[0]}&start=${timeStart}&end=${timeNow}&step=1`;
  return query;
}

queryAlgorithms.instantQuery = function (metric) {
  return `query?query=${metric[0]}`;
}

queryAlgorithms.instantQueryWithAggregation = function (metric, aggregation) {
  let output = 'query?query=';
  if (aggregation[0] === "Sum") {
    output += `sum(${metric[0]})`;
  } else if (aggregation[0] === "Average") {
    output += `avg(${metric[0]})`;
  } 
  return output;
}





// console.log(queryAlgo.simpleAlgo("http_seconds"));
export default queryAlgorithms;