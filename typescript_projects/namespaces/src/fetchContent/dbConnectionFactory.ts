const postgres = require('postgres')

function createConnection(connectionInfo): any {
	console.log(connectionInfo)
	return postgres('postgres://username:password@host:port/database', {
		host: connectionInfo.host,
		port: connectionInfo.port,
		database: connectionInfo.dbname,
		username: connectionInfo.username,
		password: connectionInfo.password
	})
}

console.log('SEARCHING FOR ARTICLES')

async function listArticles() {
	const sql = createConnection({
		host: '0.0.0.0',
		port: 5432,
		dbname: 'content',
		username: 'stampen',
		password: 'opensesame'
	})

	try {

		const articles = await sql`SELECT * FROM content.article LIMIT 5`
		console.log(articles)
		
	} catch (error) {
		console.log(error)
	}
}

//listArticles()

export default createConnection
