import { readSql } from './readSql'

type SearchResult = {
	uuid: string
	name: string
}

async function search(
	db: any,
	value: string,
	filename: string
): Promise<Array<SearchResult>> {
	const file = await readSql(filename)
	const items = await db.unsafe(file, [value])

	return items.map((item) => ({
		uuid: item.uuid,
		name: item.name
	}))
}

async function searchTags(db: any, tag: string): Promise<Array<SearchResult>> {
	return search(db, `${tag || ''}%`, 'searchTags')
}

async function searchCategories(
	db: any,
	category: string
): Promise<Array<SearchResult>> {
	return search(db, `${category || ''}%`, 'searchCategories')
}

async function searchAuthors(
	db: any,
	author: string
): Promise<Array<SearchResult>> {
	return search(db, `%${author || ''}%`, 'searchAuthors')
}

export { searchTags, searchCategories, searchAuthors }
