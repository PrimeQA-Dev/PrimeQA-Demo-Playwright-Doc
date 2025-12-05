import { promises as fs } from 'fs';

export async function getTestDataValue(path: string): Promise<string | undefined> {
  try {
    const data = await fs.readFile('./TestData/testdata.json', 'utf-8');
    const parsedData = JSON.parse(data);

    const keys = path.split(':'); 
    let value: any = parsedData;

    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) {
        throw new Error(`Invalid path: ${path}`);
      }
    }

    return value;
  } catch (error: any) {
    throw new Error(`Unable to read test data: ${error.message}`);
  }
}
