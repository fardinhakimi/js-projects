const path = require('path')
const fs = require('fs')
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

const sqlCache = {}
async function readSql(fileName: string): Promise<string> {
	const filePath = path.join(__dirname, 'sql', `${fileName}.sql`)
	if (!sqlCache[filePath]) {
		// eslint-disable-next-line require-atomic-updates
		sqlCache[filePath] = await readFile(filePath, 'utf8')
	}

	return sqlCache[filePath]
}

export { readSql }
