const searchSources = async (name = '') => {
	const sources = ['Writer', 'TT']
	return Promise.resolve(sources.filter((source => source.toLowerCase() === name.toLowerCase())))
}

async function run(){
    const result =  await searchSources('TT')
    console.log(result)
}

run()

