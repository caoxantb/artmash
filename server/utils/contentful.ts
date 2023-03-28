import { createClient } from "contentful";

export const getAllEntriesFromContentful = async (
  spaceId: string,
  accessToken: string,
  contentTypeId?: string,
  environmentId?: string
) => {
  const client = createClient({
    space: spaceId,
    environment: environmentId ? environmentId : "master",
    accessToken: accessToken,
  });

  const response = contentTypeId
    ? await client.getEntries({
        content_type: contentTypeId,
      })
    : await client.getEntries();

  const rawData = response.items.map(async (res: any) => {
    const fields = res.fields;
    const entryId = res.sys.id;
    Object.keys(fields).forEach((key) => {
      if (fields[key].sys?.type === "Asset") {
        fields[key] = fields[key].fields.file.url;
      }
    });
    return { ...fields, entryId };
  });

  const data = await Promise.all(rawData);

  return data;
};

export const getEntriesIdFromContentful = async (
  spaceId: string,
  accessToken: string,
  contentTypeId?: string,
  environmentId?: string
) => {
  const client = createClient({
    space: spaceId,
    environment: environmentId ? environmentId : "master",
    accessToken: accessToken,
  });

  const response = contentTypeId
    ? await client.getEntries({
        content_type: contentTypeId,
      })
    : await client.getEntries();

  const data = response.items.map((res) => res.sys.id);

  return data;
};

export const getEntryFromContentful = async (
  spaceId: string,
  accessToken: string,
  entryId: string,
  environmentId?: string
) => {
  const client = createClient({
    space: spaceId,
    environment: environmentId ? environmentId : "master",
    accessToken: accessToken,
  });

  const response = await client.getEntry(entryId);

  const fields: any = response.fields;
  Object.keys(fields).forEach((key) => {
    if (fields[key].sys?.type === "Asset") {
      fields[key] = fields[key].fields.file.url;
    }
  });
  return fields;
};
