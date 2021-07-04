SELECT
    C.uuid
FROM
    content.category C
    JOIN content.article_category_mapping CTM ON C.uuid = CTM.category_uuid
WHERE
    CTM.article_uuid = A.uuid
    AND C.name IN (@prm)
