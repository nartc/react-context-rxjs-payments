import { Card, Col, Row } from 'antd';
import React from 'react';
import './App.css';
import { MainTableContainer } from './containers/MainTableContainer';
import { AppConfigContextProvider } from './contexts/AppConfigContext';
import { TableConfigContextProvider } from './contexts/TableConfigContext';
import { AppConfig } from './models/AppConfig';
import { TableConfig } from './models/TableConfig';

interface Props {
  appConfig: AppConfig;
  tableConfig: TableConfig;
}

const App: React.FC<Props> = ({ appConfig, tableConfig }) => (
  <AppConfigContextProvider {...appConfig}>
    <TableConfigContextProvider {...tableConfig}>
      <Row style={{ padding: '2rem' }}>
        <Col span={24}>
          <Card>
            <MainTableContainer />
          </Card>
        </Col>
      </Row>
    </TableConfigContextProvider>
  </AppConfigContextProvider>
);

export default App;
