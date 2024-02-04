import { getGoodMenu } from '@/api/goodsApi';
import { useQuery } from '@tanstack/react-query';
import { Layout, Menu } from 'antd';
const { Sider, Content } = Layout;

export default function PricesPage() {
  const { data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ['good-menu'],
    queryFn: getGoodMenu,
  });

  return (
    <>
      <Sider width={200}>
        {isSuccess && <Menu mode='inline' items={data} />}
      </Sider>
      <Layout>
        <Content></Content>
      </Layout>
    </>
  );
}
