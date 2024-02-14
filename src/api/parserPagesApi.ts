import { ParserPage } from '@/types';
import axios from 'axios';

const BASE_URL = 'https://danildev.net';

export async function getParserPages(
  parserCompanyId: number
): Promise<ParserPage[]> {
  const path = `${BASE_URL}/api/parser/v1/companies/${parserCompanyId}/pages`;

  const { data: parserPages } = await axios.get<ParserPage[]>(path);

  return parserPages;
}

export async function createParserPage(parserPage: ParserPage): Promise<void> {
  const path = `${BASE_URL}/api/parser/v1/companies/${parserPage.parserCompanyId}/pages`;

  await axios.post(path, parserPage);
}

export async function updateParserPage(parserPage: ParserPage): Promise<void> {
  const path = `${BASE_URL}/api/parser/v1/companies/${parserPage.parserCompanyId}/pages/${parserPage.id}`;

  await axios.put(path, parserPage);
}

export async function deleteParserPage(
  parserCompanyId: number,
  pageId: number
): Promise<void> {
  const path = `${BASE_URL}/api/parser/v1/companies/${parserCompanyId}/pages/${pageId}`;

  await axios.delete(path);
}

export async function setParserPageStatus(
  parserCompanyId: number,
  pageId: number,
  isActive: boolean
): Promise<void> {
  const path = `${BASE_URL}/api/parser/v1/companies/${parserCompanyId}/pages/${pageId}/is-active`;

  await axios.put(path, undefined, { params: { isActive } });
}
