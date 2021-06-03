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
const queryAlgo = {};

queryAlgo.simpleAlgo = function (...args){
  let output = 'query=';
  for(const arg of args){
    if(output !== 'query='){
      output += '&'
    }
    output += arg;
  }
  return output; // ?query=http_seconds&time=34s
}
// dashboard---------
// const  query= queryAlgo.simpleAlgo({http_request})
// fetch(`localhost:9090/api/v1/query?${query}`).then(updatecolumns)


console.log(queryAlgo.simpleAlgo("http_seconds"));
export default queryAlgo;