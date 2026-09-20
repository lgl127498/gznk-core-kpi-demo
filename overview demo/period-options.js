// Same year → quarter → month structure as getSeasonMonthsOptions.
window.demoPeriodOptions = [2026, 2025].map(function (year) {
  var max = year === 2026 ? 8 : 12;
  return {label: String(year), value: year, children: [0,1,2,3].filter(function(q){return q*3 < max}).map(function(q){
    return {label: ['一季度','二季度','三季度','四季度'][q], value: year+'_'+q, children: [1,2,3].map(function(n){return q*3+n}).filter(function(m){return m<=max}).map(function(m){return {label:m+'月',value:year+'-'+String(m).padStart(2,'0')}})};
  })};
});
window.demoAllMonths = Array.from({length:8}, function(_,i){return '2026-'+String(i+1).padStart(2,'0')});
