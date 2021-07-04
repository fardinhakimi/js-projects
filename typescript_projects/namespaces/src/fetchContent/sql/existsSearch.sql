SELECT
    AUTH.uuid
FROM
    content.author AUTH
    INNER JOIN content.article_author_mapping AAM ON AUTH.uuid = AAM.author_uuid
WHERE AAM.article_uuid = A.uuid
    AND (AUTH.name ILIKE @prm
    OR coalesce(A.teaser_title, A.title)
    ILIKE @prm)
