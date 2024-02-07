import { getGoodMenu } from '@/api/goodsApi';
import { GoodMenuItem } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Layout, Menu, MenuProps, Skeleton } from 'antd';
import { SubMenuType } from 'antd/es/menu/hooks/useItems';
import { useState } from 'react';
const { Sider, Content } = Layout;

export default function PricesPage() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['good-menu'],
    queryFn: getGoodMenu,
  });

  const onItemClick = ({
    key,
    keyPath,
  }: {
    key: string;
    keyPath: string[];
  }) => {
    setOpenKeys([...keyPath, key]);
    setSelectedKeys([...keyPath, key]);
  };

  const getMenuItems = (items: GoodMenuItem[]): MenuProps['items'] => {
    return items.map((item) =>
      item.children
        ? ({
            ...item,
            children: getMenuItems(item.children),
            onTitleClick: () => {
              const keys = [`${item.id}`, ...item.path.split('/')];
              setOpenKeys(keys);
              setSelectedKeys(keys);
            },
          } as SubMenuType)
        : { ...item }
    );
  };

  return (
    <Layout hasSider>
      <Sider
        width={250}
        theme='light'
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        {isLoading && <Skeleton active paragraph={{ rows: 20 }}></Skeleton>}
        {isSuccess && (
          <Menu
            mode='inline'
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onClick={onItemClick}
            items={getMenuItems(data)}
          />
        )}
      </Sider>
      <Layout>
        <Content></Content>
      </Layout>
    </Layout>
  );
}
