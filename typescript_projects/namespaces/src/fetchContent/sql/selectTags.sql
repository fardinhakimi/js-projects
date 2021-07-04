SELECT
    T.uuid,
    TAM.article_uuid,
    name
FROM
    content.tag T
    INNER JOIN content.article_tag_mapping TAM ON TAM.tag_uuid = T.uuid
    INNER JOIN (@articlesSql) A ON A.uuid = TAM.article_uuid;

