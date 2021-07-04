SELECT
    AUTH.uuid,
    AAM.article_uuid,
    name
FROM
    content.author AUTH
    INNER JOIN content.article_author_mapping AAM ON AAM.author_uuid = AUTH.uuid
    INNER JOIN (@articlesSql) A ON A.uuid = AAM.article_uuid;

