import { readSql } from './readSql'

const sqlFiles = {
	articles: 'selectArticles',
	authors: 'selectAuthors',
	tags: 'selectTags',
	categories: 'selectCategories',
	existsSearch: 'existsSearch',
	existsCategory: 'existsCategory',
	existsTags: 'existsTags',
	existsAuhtors: 'existsAuthors'
}

const articleRelations = {
	bylines: { include: false, file: sqlFiles.authors },
	tags: { include: false, file: sqlFiles.tags },
	categories: { include: false, file: sqlFiles.categories }
}

const relationNames = {
	authors: 'bylines',
	tags: 'tags',
	categories: 'categories'
}

class ArticlesBuilder {
	private sql
	private searchValue: string = ''
	private limit: number = 50
	private tags: Array<string> = []
	private categories: Array<string> = []
	private authors: Array<string> = []
	private uuids: Array<string> = []
	private parsedArticlesSql: string
	private articleParams: Array<any> = []
	private sources: Array<string> = []

	constructor(pg: any) {
		this.sql = pg
	}

	public withLimit(limit: number): ArticlesBuilder {
		if (!limit) {
			return this
		}
		this.limit = limit
		return this
	}

	public withSearchValue(value: string): ArticlesBuilder {
		if (!value) {
			return this
		}
		this.searchValue = `%${value || ''}%`
		return this
	}

	public withTags(value: Array<string>): ArticlesBuilder {
		if (!value || value.length === 0) {
			return this
		}
		this.tags = value
		return this
	}

	public withCategories(value: Array<string>): ArticlesBuilder {
		if (!value || value.length === 0) {
			return this
		}
		this.categories = value
		return this
	}

	public withAuthors(value: Array<string>): ArticlesBuilder {
		if (!value || value.length === 0) {
			return this
		}
		this.authors = value
		return this
	}

	public withUuids(value: Array<string>): ArticlesBuilder {
		if (!value || value.length === 0) {
			return this
		}
		this.uuids = value
		return this
	}

	public withSources(value: string[]): ArticlesBuilder {
		if (!value || value.length === 0) {
			return this
		}
		this.sources = value
		return this
	}

	public includeAuthorsIf(condition: boolean): ArticlesBuilder {
		if (!condition) {
			return this
		}
		articleRelations[relationNames.authors].include = true
		return this
	}

	public includeTagsIf(condition: boolean): ArticlesBuilder {
		if (!condition) {
			return this
		}
		articleRelations[relationNames.tags].include = true
		return this
	}

	public includeCategoriesIf(condition: boolean): ArticlesBuilder {
		if (!condition) {
			return this
		}
		articleRelations[relationNames.categories].include = true
		return this
	}

	private async selectArticlesRelation(file): Promise<any> {
		const relationSql = await readSql(file)

		const sql = relationSql.replace('@articlesSql', this.parsedArticlesSql)
		return this.sql.unsafe(sql, this.articleParams)
	}

	private async replaceString(value: string, file: string): Promise<string> {
		this.articleParams.push(value)
		const searchSql = await readSql(file)
		return searchSql.replace(/@prm/g, `$${this.articleParams.length}`)
	}

	private async replaceArray(
		value: Array<string>,
		file: string
	): Promise<string> {
		const replacement = value.map((t) => {
			this.articleParams.push(t)
			return `$${this.articleParams.length}`
		})
		const tagsSql = await readSql(file)
		return tagsSql.replace(/@prm/g, replacement.join(', '))
	}

	private articleWhereInConditions(): Array<string> {
		let whereInSql = []
		if(this.sources.length > 0) {
			whereInSql.push(`AND lower(A.source) IN (${this.sources.map(source => "'"+source.toLowerCase()+"'").join(',')})`)
		}
		return whereInSql
	}

	private buildWhereSql(whereConditions: Array<string>): string {
		const whereSql: string = whereConditions
			.reduce((total: Array<string>, current: string) => {
				total.push(`AND EXISTS (${current})`)
				return total
			}, [])
			.join(' ')

		const whereInSql: string = this.articleWhereInConditions().join(' ')
		return `${whereInSql} ${whereSql}`
	}

	private buildArticleSql(
		sqlFile: string,
		whereConditions: Array<string>
	): string {
		
		// uuidOrdering requires that we add an extra
		// column to the select list, manual_ordering.
		let orderBy = 'ORDER BY last_edit_date DESC'
		let uuidOrderingColumn = ''
		if (this.uuids.length > 0) {
			orderBy = 'ORDER BY manual_ordering'
			uuidOrderingColumn = ', manual.manual_ordering'
		}
		this.parsedArticlesSql = this.resolveUuidsCriteria(
			sqlFile.replace('@where', this.buildWhereSql(whereConditions))
		)
			.replace('@uuidOrderingColumn', uuidOrderingColumn)
			.replace('@orderBy', orderBy)

		console.log('sql', this.parsedArticlesSql, 'prms', this.articleParams)
		return this.parsedArticlesSql
	}

	private resolveUuidsCriteria(sql): string {
		if (this.uuids.length <= 0) {
			return sql.replace('@uuidCriteria', '')
		}

		// When uuid criterias is used the result set should be
		// sorted in the same order as the passed in uuids.
		// For example [99, 22, 33] should result in an order
		// where 99 comes first and 22 next and so forth.
		// To handle this we create and join a 'constant table' with
		// the help of VALUES.
		//
		// The join will translate to something like this:
		// JOIN (values (uuid, order), (uuid, order)) as manual
		// (id, manual_ordering) on A.uuid = uuid(manual.id)
		// where uuid is a paramter like $2 and order is just the
		// index of the parameter. So it's something like
		// JOIN (values ($2, 2), ($3, 3))

		const inStr = this.uuids.reduce((total: string, uuId: string) => {
			this.articleParams.push(uuId)
			return `${total}${total === '' ? '' : ', '}($${
				this.articleParams.length
			},${this.articleParams.length})`
		}, '')
		return sql.replace(
			'@uuidCriteria',
			`JOIN (values ${inStr}) as manual (id, manual_ordering) on A.uuid = uuid(manual.id)`
		)
	}

	private async selectArticles(): Promise<any> {
		const sqlFile = await readSql(sqlFiles.articles)
		const where: Array<string> = []
		this.articleParams.push(this.limit)

		if (this.searchValue) {
			where.push(
				await this.replaceString(this.searchValue, sqlFiles.existsSearch)
			)
		}

		if (this.authors.length > 0) {
			where.push(await this.replaceArray(this.authors, sqlFiles.existsAuhtors))
		}
		if (this.tags.length > 0) {
			where.push(await this.replaceArray(this.tags, sqlFiles.existsTags))
		}
		if (this.categories.length > 0) {
			where.push(
				await this.replaceArray(this.categories, sqlFiles.existsCategory)
			)
		}

		return this.sql.unsafe(
			this.buildArticleSql(sqlFile, where),
			this.articleParams
		)
	}
	private createMap(relation: Array<any>): any {
		const map = {}

		relation.forEach((item) => {
			if (!map[item.article_uuid]) {
				map[item.article_uuid] = []
			}
			map[item.article_uuid].push({ uuid: item.uuid, name: item.name })
		})

		return map
	}

	private async selectRelations(): Promise<any> {
		const result = {
			authors: [],
			tags: [],
			categories: []
		}
		await Promise.all(
			Object.keys(articleRelations)
				.filter((key) => articleRelations[key].include)
				.map(async (key) => {
					const relation = await this.selectArticlesRelation(
						articleRelations[key].file
					)

					const relationMap = this.createMap(relation)
					result[key] = relationMap
				})
		)
		return result
	}

	public async execute(): Promise<any> {
		const articles = await this.selectArticles()
		const relations = await this.selectRelations()

		const result = articles.map((singleArticle) => ({
			uuid: singleArticle.uuid,
			teaserTitle: singleArticle.teaser_title,
			teaserLead: singleArticle.teaser_lead,
			teaserImage: singleArticle.teaser_image,
			title: singleArticle.title,
			lead: singleArticle.lead,
			premium: singleArticle.premium,
			status: singleArticle.status,
			source:singleArticle.source,
			mainSiteName: singleArticle.main_site_name,
			bylines: relations[relationNames.authors]
				? relations[relationNames.authors][singleArticle.uuid]
				: [],
			tags: relations[relationNames.tags]
				? relations[relationNames.tags][singleArticle.uuid]
				: [],
			categories: relations[relationNames.categories]
				? relations[relationNames.categories][singleArticle.uuid]
				: [],
			publishDate: singleArticle.publish_date,
			lastEditDate: singleArticle.last_edit_date
		}))
		return result
	}
}

export default ArticlesBuilder
