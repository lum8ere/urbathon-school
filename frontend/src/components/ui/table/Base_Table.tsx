import { Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { memo, useEffect, useState } from 'react';

type BaseTableProps = {
    data: any[];
    columns: ColumnsType<any>;
};

export const Base_table = memo<BaseTableProps>(({ columns, data }) => {
    return <Table columns={columns} rowKey={(record) => record.login.uuid} dataSource={data} />;
});
