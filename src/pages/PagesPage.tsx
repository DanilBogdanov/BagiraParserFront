import { Layout, Menu, Skeleton, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getParserCompanies } from '@/api/competitorsApi';
import { ParserCompany, ParserPage } from '@/types';
import { getParserPages } from '@/api/parserPagesApi';
import { useState } from 'react';
import { Button, Container, Group } from '@mantine/core';
const { Sider, Content } = Layout;

export default function PagesPage() {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const {
    data: parserCompanies,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['parser-companies'],
    queryFn: getParserCompanies,
  });

  const {
    data: parserPages,
    isSuccess: pagesIsSuccess,
    isFetching,
  } = useQuery({
    queryKey: ['parser-pages', selectedCompany],
    enabled: !!selectedCompany,
    queryFn: selectedCompany
      ? () => getParserPages(selectedCompany)
      : undefined,
  });

  const getMenuItems = (companies: ParserCompany[]) => {
    return companies.map((item) => ({
      key: item.id,
      label: item.name,
    }));
  };

  const getTableData = (pages: ParserPage[]) => {
    return pages.map((page, idx) => ({ idx: idx + 1, key: page.id, ...page }));
  };

  const columns = [
    { title: '#', dataIndex: 'idx', key: 'idx' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Url', dataIndex: 'url', key: 'url' },
  ];

  return (
    <Layout hasSider>
      <Sider width={250} theme='light'>
        {isLoading && <Skeleton active paragraph={{ rows: 3 }}></Skeleton>}
        {isSuccess && (
          <Menu
            mode='inline'
            items={getMenuItems(parserCompanies)}
            onClick={({ key }) => setSelectedCompany(+key)}
          />
        )}
      </Sider>
      <Layout>
        <Content>
          <Container>
            <Group justify='flex-end'>
              <Button variant='filled'>Add</Button>
            </Group>
          </Container>
          {selectedCompany}={JSON.stringify(parserPages)}
          {pagesIsSuccess && (
            <Table
              dataSource={getTableData(parserPages)}
              columns={columns}
              loading={isFetching}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
