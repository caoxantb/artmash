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
    if (fields.image) {
      const image = await client.getAsset(fields.image.sys.id);
      const imageUrl = image.fields.file.url;
      return { ...fields, image: imageUrl};
    }
    return fields;
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

  const response = await client.getEntry(entryId)

  const fields: any = response.fields;
  if (fields.image) {
    const image = await client.getAsset(fields.image.sys.id);
    const imageUrl = image.fields.file.url;
    return { ...fields, image: imageUrl };
  }
  return { ...fields };
};

