SELECT DISTINCT
    A.uuid,
    coalesce(teaser_title, title) AS teaser_title,
    teaser_lead,
    teaser_image,
    title,
    lead,
    premium,
    status,
    source,
    main_site_name,
    publish_date,
    last_edit_date
    @uuidOrderingColumn
FROM
    content.article A
@uuidCriteria
WHERE
    publish_date IS NOT NULL @where
@orderBy
LIMIT $1
