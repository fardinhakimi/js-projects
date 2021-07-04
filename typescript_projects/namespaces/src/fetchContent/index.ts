import ArticlesBuilder from './articlesBuilder'
import { searchTags, searchCategories, searchAuthors } from './search'
import createConnection from './dbConnectionFactory'

let dbConnection: any
const relationNames = {
	authors: 'bylines',
	tags: 'tags',
	categories: 'categories'
}

export const run = async (event: any, connectionInfo: any): Promise<any> => {
	try {
		if (!dbConnection) {
			dbConnection = createConnection(connectionInfo)
		}

		const queryField: string = event.info.fieldName

		switch (queryField) {
			case 'listArticles': {
				let builder = new ArticlesBuilder(dbConnection)

				if (event.arguments.searchValue) {
					builder = builder.withSearchValue(event.arguments.searchValue)
				}
				const result = await builder
					.withLimit(event.arguments.limit)
					.withSearchValue(event.arguments.searchValue)
					.withUuids(event.arguments.uuids)
					.withSources(event.arguments.sources)
					.withTags(event.arguments.tags)
					.withAuthors(event.arguments.authors)
					.withCategories(event.arguments.categories)
					.includeAuthorsIf(
						event.selectionSetList.includes(relationNames.authors)
					)
					.includeTagsIf(event.selectionSetList.includes(relationNames.tags))
					.includeCategoriesIf(
						event.selectionSetList.includes(relationNames.categories)
					)
					.execute()
				return result
			}
			case 'searchTags': {
				return searchTags(dbConnection, event.arguments.name)
			}
			case 'searchCategories': {
				return searchCategories(dbConnection, event.arguments.name)
			}
			case 'searchAuthors': {
				return searchAuthors(dbConnection, event.arguments.name)
			}

			default:
				throw new Error(`Field ${queryField} is invalid`)
		}
	} catch (error) {
		console.log('Error => ', error)
	}
}


interface connectionInfo {
	host: string,
	port: number,
	dbname: string,
	username: string,
	password: string
}

function getConnectionInfo(): connectionInfo{
	return {
		host: '0.0.0.0',
		port: 5432,
		dbname: 'content',
		username: 'stampen',
		password: 'opensesame'
	}
}

const event = {
	info: {
		fieldName: 'listArticles'
	},
	arguments: {
		limit: 5,
		sources: ['TT', 'Writer'],
		//uuids: ['caa947be-558d-51b5-9ffc-e5f72276ece3']
		authors: ['Etezaz Yousuf']
	},
	selectionSetList: []
}

const result = run(event, getConnectionInfo())

console.log(result)

