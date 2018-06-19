const coroutine = (gen) => (...args) => {
  const generator = gen(...args)
  // result is the object yielded/returned by the generator: {done: '', value: ''}
  const cont = result => result.done 
    ? result.value 
    : Promise.resolve(result.value) 
        .then(val => cont(generator.next(val)))
        .catch(err => cont(generator.throw(err))) // infinitely recursive
  
  return cont(generator.next()) // recursion
}

const ingested = value => value.reduce((prev, curr, j) => {
	const point = {}
	point[curr['sta_id'][0]] = curr['ec'][0]
 	// point['stnId'] = curr['sta_id'][0]
	// point['stnName'] = curr['sta_nm'][0]
	// point['lat'] = curr['latitude'][0]
	// point['lon'] = curr['longitude'][0]
	// point['date'] = curr['nfdr_dt'][0]
	// point['ERC'] = curr['ec'][0]	
	prev.push(point)
	return prev
}, [])

// const getData = value => {
// 	return new Promise((resolve, reject) => {
// 		try {	ingested(value)	}
// 		catch (e) {	console.error(e) }
// 		// setTimeout(Math.random() > 0.3 ? resolve : reject, 1000, value)	
// 	})
// }

const handleJson = coroutine(function*(values) {
  const results = []
  for (const val of values.map(ingested)) {
    try {
      results.push(yield val)
    } 
    catch (e) {
      results.push(`${e} ✗`)
    }
  }
  return results
})

const extractor = array => {
	console.time('handleJson')
	return handleJson(array)
		.then(res => {
			console.log(res)
			console.timeEnd('handleJson')
		})
		.catch(console.error)
}

module.exports = coroutine

